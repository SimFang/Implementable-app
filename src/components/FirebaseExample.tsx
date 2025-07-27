'use client';

import { useState, useEffect } from 'react';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { useFirestore } from '@/hooks/useFirestore';
import { useStorage } from '@/hooks/useStorage';
import { useFirebase } from '@/context/FirebaseContext';
import './firebase-example.css';

export default function FirebaseExample() {
  const { user } = useFirebase();
  const { signIn, signInWithGoogle, logout, loading: authLoading } = useFirebaseAuth();
  const { add, getAll, loading: dbLoading } = useFirestore('examples');
  const { upload, loading: storageLoading } = useStorage('examples');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [documents, setDocuments] = useState<any[]>([]);

  useEffect(() => {
    // Fetch documents when component mounts
    const fetchDocuments = async () => {
      const snapshot = await getAll();
      if (snapshot) {
        const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDocuments(docs);
      }
    };

    fetchDocuments();
  }, [getAll]);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn(email, password);
    if (result) {
      setMessage('Signed in successfully!');
    }
  };

  const handleGoogleSignIn = async () => {
    const result = await signInWithGoogle();
    if (result) {
      setMessage('Signed in with Google successfully!');
    }
  };

  const handleAddDocument = async () => {
    if (!user) return;
    
    const data = {
      text: message,
      userId: user.uid,
      createdAt: new Date().toISOString(),
    };

    const docId = await add(data);
    if (docId) {
      setMessage('Document added successfully!');
    }
  };

  const handleFileUpload = async () => {
    if (!file) return;

    const url = await upload(file);
    if (url) {
      setMessage('File uploaded successfully!');
    }
  };

  return (
    <div className="firebase-container">
      <h2 className="firebase-title">Firebase Example</h2>

      {/* Authentication */}
      {!user ? (
        <div className="firebase-auth-section">
          <form onSubmit={handleEmailSignIn} className="firebase-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="firebase-input"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="firebase-input"
            />
            <button
              type="submit"
              disabled={authLoading}
              className="firebase-button-primary"
            >
              Sign In
            </button>
          </form>
          <button
            onClick={handleGoogleSignIn}
            disabled={authLoading}
            className="firebase-button-google"
          >
            Sign in with Google
          </button>
        </div>
      ) : (
        <div className="firebase-user-section">
          <p>Welcome, {user.email}!</p>
          <button
            onClick={logout}
            className="firebase-button-signout"
          >
            Sign Out
          </button>
        </div>
      )}

      {/* Firestore */}
      {user && (
        <div className="firebase-firestore-section">
          <h3 className="firebase-section-title">Add Document</h3>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter message"
            className="firebase-input"
          />
          <button
            onClick={handleAddDocument}
            disabled={dbLoading}
            className="firebase-button-add"
          >
            Add Document
          </button>

          <h3 className="firebase-section-title">Documents</h3>
          <div className="firebase-documents">
            {documents.map((doc) => (
              <div key={doc.id} className="firebase-document">
                <p>{doc.text}</p>
                <p className="firebase-document-date">{new Date(doc.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Storage */}
      {user && (
        <div className="firebase-storage-section">
          <h3 className="firebase-section-title">File Upload</h3>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="firebase-input"
          />
          <button
            onClick={handleFileUpload}
            disabled={!file || storageLoading}
            className="firebase-button-upload"
          >
            Upload File
          </button>
        </div>
      )}

      {/* Status Message */}
      {message && (
        <div className="firebase-message">
          {message}
        </div>
      )}
    </div>
  );
}