'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { app, auth, db, storage } from '@/config/firebase';
import { User } from 'firebase/auth';

interface FirebaseContextType {
  app: typeof app;
  auth: typeof auth;
  db: typeof db;
  storage: typeof storage;
  user: User | null;
  loading: boolean;
}

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <FirebaseContext.Provider
      value={{
        app,
        auth,
        db,
        storage,
        user,
        loading,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
}