import { useState } from 'react';
import {
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  WhereFilterOp,
  DocumentData,
  QuerySnapshot,
  DocumentSnapshot,
} from 'firebase/firestore';
import { useFirebase } from '@/context/FirebaseContext';

export function useFirestore(collectionName: string) {
  const { db } = useFirebase();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const add = async (data: DocumentData, customId?: string) => {
    try {
      setLoading(true);
      setError(null);
      if (customId) {
        const docRef = doc(db, collectionName, customId);
        await setDoc(docRef, data);
        return customId;
      } else {
        const collectionRef = collection(db, collectionName);
        const docRef = await addDoc(collectionRef, data);
        return docRef.id;
      }
    } catch (err) {
      console.error('Error adding document:', err);
      setError(err instanceof Error ? err.message : 'Error adding document');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: string, data: DocumentData) => {
    try {
      setLoading(true);
      setError(null);
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, data);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating document');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting document');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const get = async (id: string): Promise<DocumentSnapshot | null> => {
    try {
      setLoading(true);
      setError(null);
      const docRef = doc(db, collectionName, id);
      return await getDoc(docRef);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error getting document');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getAll = async (): Promise<QuerySnapshot | null> => {
    try {
      setLoading(true);
      setError(null);
      const collectionRef = collection(db, collectionName);
      return await getDocs(collectionRef);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error getting documents');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const queryDocuments = async (
    field: string,
    operator: WhereFilterOp,
    value: any
  ): Promise<QuerySnapshot | null> => {
    try {
      setLoading(true);
      setError(null);
      const collectionRef = collection(db, collectionName);
      const q = query(collectionRef, where(field, operator, value));
      return await getDocs(q);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error querying documents');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    add,
    update,
    remove,
    get,
    getAll,
    queryDocuments,
    error,
    loading,
  };
}