import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  userId: string;
  name: string;
  email: string;
  image?: string;
  bio?: string | null;
  country?: string | null;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  accessToken?: string;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  accessToken: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      if (action.payload === null) {
        state.user = null;
        state.isAuthenticated = false;
      } else {
        state.user = action.payload;
        state.isAuthenticated = true;
      }
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setAccessToken: (state, action: PayloadAction<string | undefined>) => {
      state.accessToken = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.accessToken = undefined;
      state.error = null;
    },
  },
});

export const { setUser, setLoading, setError, setAccessToken, logout } = authSlice.actions;
export default authSlice.reducer;