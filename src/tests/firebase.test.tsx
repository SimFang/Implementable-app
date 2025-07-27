import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { FirebaseProvider } from '@/context/FirebaseContext';
import FirebaseExample from '@/components/FirebaseExample';

// Mock Firebase
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signInWithPopup: jest.fn(),
  GoogleAuthProvider: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  addDoc: jest.fn(),
  getDocs: jest.fn(),
}));

jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(),
  ref: jest.fn(),
  uploadBytes: jest.fn(),
  getDownloadURL: jest.fn(),
}));

describe('FirebaseExample Component', () => {
  const mockUser = {
    uid: '123',
    email: 'test@example.com',
  };

  beforeEach(() => {
    render(
      <Provider store={store}>
        <FirebaseProvider>
          <FirebaseExample />
        </FirebaseProvider>
      </Provider>
    );
  });

  it('renders authentication form when not logged in', () => {
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Sign in with Google')).toBeInTheDocument();
  });

  it('handles email sign in', async () => {
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const signInButton = screen.getByText('Sign In');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(screen.getByText('Signed in successfully!')).toBeInTheDocument();
    });
  });

  it('handles Google sign in', async () => {
    const googleButton = screen.getByText('Sign in with Google');
    fireEvent.click(googleButton);

    await waitFor(() => {
      expect(screen.getByText('Signed in with Google successfully!')).toBeInTheDocument();
    });
  });

  it('handles document creation', async () => {
    // Mock user being logged in
    const messageInput = screen.getByPlaceholderText('Enter message');
    const addButton = screen.getByText('Add Document');

    fireEvent.change(messageInput, { target: { value: 'Test message' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Document added successfully!')).toBeInTheDocument();
    });
  });

  it('handles file upload', async () => {
    const fileInput = screen.getByLabelText('Upload File');
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });

    fireEvent.change(fileInput, { target: { files: [file] } });
    const uploadButton = screen.getByText('Upload File');
    fireEvent.click(uploadButton);

    await waitFor(() => {
      expect(screen.getByText('File uploaded successfully!')).toBeInTheDocument();
    });
  });
});