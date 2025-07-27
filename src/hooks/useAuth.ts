import { useAppDispatch, useAppSelector } from './redux';
import { setUser, setLoading, setError, setAccessToken, logout } from '@/store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, loading, error, accessToken } = useAppSelector(
    (state) => state.auth
  );

  const login = async (email: string, password: string) => {
    dispatch(setError(null));
    dispatch(setLoading(true));

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.user?.userId && data.user?.name && data.user?.email) {
        dispatch(setUser({
          userId: data.user.userId,
          name: data.user.name,
          email: data.user.email,
          image: data.user.image
        }));
        dispatch(setAccessToken(data.token));
        return { success: true };
      } else {
        dispatch(setError(data.message || 'Authentication failed'));
        return { success: false, error: data.message };
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      dispatch(setError(errorMessage));
      return { success: false, error: errorMessage };
    } finally {
      dispatch(setLoading(false));
    }
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    accessToken,
    login,
    logout: logoutUser,
  };
};