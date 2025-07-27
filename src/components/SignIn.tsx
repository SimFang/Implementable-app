'use client';

import { useState } from 'react';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { useFirebase } from '@/context/FirebaseContext';
import { useRouter } from 'next/navigation';
import { login as backendLogin } from '../../helpers/auth/login';
import { useDispatch } from 'react-redux';
import { setAccessToken, setUser } from '@/store/slices/authSlice';
import { getAuth } from 'firebase/auth';
import './signin.css';
import SideGradientPanel from './style/SideGradientPanel';
import Logo from './style/Logo';

export default function SignIn() {
  const { signIn, signInWithGoogle, loading } = useFirebaseAuth();
  const { user } = useFirebase();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleAuthSuccess = async () => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) throw new Error('No Firebase user');

      const token = await currentUser.getIdToken(true);
      const backendUser = await backendLogin(token);

      dispatch(setAccessToken(backendUser.accessToken));
      dispatch(setUser({
        userId: backendUser.userId,
        name: backendUser.name,
        email: backendUser.email,
        image: backendUser.profile_picture,
        bio : backendUser.bio,
        country : backendUser.country
      }));

      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signIn(email, password);
      await handleAuthSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid email or password');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      await signInWithGoogle();
      await handleAuthSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google sign-in failed');
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
    <>
    <div className="signin-page" style={{ position: 'relative', minHeight: '100vh', display: 'flex' }}>
      <div className="signin-container" style={{ zIndex: 1, flex: 1, padding: '2rem' }}>
        <div className="signin-box">
          <Logo size={2}/>
          <h2 className="signin-title">Log in</h2>

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
              Log in with Google
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
              {loading ? 'Logging in...' : 'Log in'}
            </button>

            <div className="signin-toggle">
              <button
                type="button"
                onClick={() => router.push('/signup')}
                className="signin-toggle-button"
              >
                Need an account? Sign up
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Side Gradient Panel - Right side */}
      <SideGradientPanel />
    </div>
    
    </>
  );
}