'use client';

import { Provider } from 'react-redux';
import { store, persistor } from '@/store/store';
import { FirebaseProvider } from '@/context/FirebaseContext';
import { PersistGate } from 'redux-persist/integration/react';


export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
        <FirebaseProvider>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </FirebaseProvider>
    </Provider>
  );
}


