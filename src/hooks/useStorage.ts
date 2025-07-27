import { useState } from 'react';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
  StorageReference,
} from 'firebase/storage';
import { useFirebase } from '@/context/FirebaseContext';

export function useStorage(path: string = '') {
  const { storage } = useFirebase();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const upload = async (file: File, customPath?: string) => {
    try {
      setLoading(true);
      setError(null);
      setProgress(0);

      const filePath = customPath || `${path}/${file.name}`;
      const storageRef = ref(storage, filePath);
      
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      
      setProgress(100);
      return url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error uploading file');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getUrl = async (filePath: string) => {
    try {
      setLoading(true);
      setError(null);
      const storageRef = ref(storage, filePath);
      return await getDownloadURL(storageRef);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error getting download URL');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (filePath: string) => {
    try {
      setLoading(true);
      setError(null);
      const storageRef = ref(storage, filePath);
      await deleteObject(storageRef);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting file');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const list = async (folderPath: string = path): Promise<StorageReference[]> => {
    try {
      setLoading(true);
      setError(null);
      const storageRef = ref(storage, folderPath);
      const result = await listAll(storageRef);
      return result.items;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error listing files');
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    upload,
    getUrl,
    remove,
    list,
    error,
    loading,
    progress,
  };
}