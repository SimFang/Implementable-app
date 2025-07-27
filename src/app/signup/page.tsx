'use client';

import { useState } from 'react';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { useFirebase } from '@/context/FirebaseContext';
import { useRouter } from 'next/navigation';
import { signupUser } from '../../../helpers/auth/signup';
import { useDispatch } from 'react-redux';
import { setUser } from "@/store/slices/authSlice";
import '../../components/signin.css';
import SideGradientPanel from '../../components/style/SideGradientPanel';
import Logo from '../../components/style/Logo';

export default function SignUp() {
  const { user } = useFirebase();
  const { signInWithGoogle, loading } = useFirebaseAuth();
  const router = useRouter();  
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (!email || !password) {
        setError('You must fill in all fields');
        return;
      }

      const data = await signupUser(email, password);

      dispatch(setUser({
        userId: data.userId,
        email: email,
        name: ""
      }));

      router.push("/signup/verify-email");
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      await signInWithGoogle();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google sign-up failed');
    }
  };

  if (user) {
    return (
      <div className="signin-success">
        <p>Signed in as {user.email}</p>
      </div>
    );
  }

  return (
    <div className="signin-page" style={{ position: 'relative', minHeight: '100vh', display: 'flex' }}>
      <div className="signin-container" style={{ zIndex: 1, flex: 1, padding: '2rem' }}>
        <div className="signin-box">
          <Logo size={2} />
          <h2 className="signin-title">Sign Up</h2>

          <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="signin-button signin-button-google"
            >
              <img
                className="signin-google-icon"
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
              />
              Sign up with Google
            </button>
            <div className='or-separator'>
                  <div className='line'> </div>
                  <p className='or'>or</p>
                  <div className='line'> </div>
            </div>
          <form className="signin-form" onSubmit={handleSubmit}>
            <div className="signin-form-group">
              <label className="signin-label" htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="signin-input"
              />

              <label className="signin-label" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="signin-input"
              />
            </div>

            {error && <div className="signin-error">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="signin-button signin-button-primary"
            >
              {loading ? 'Signing up...' : 'Sign up'}
            </button>

           

            <div className="signin-toggle">
              <button
                type="button"
                onClick={() => router.push('/signin')}
                className="signin-toggle-button"
              >
                Already have an account? Log in
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right side gradient panel */}
      <SideGradientPanel />
    </div>
  );
}