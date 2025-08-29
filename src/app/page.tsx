'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/landing');
  }, [router]);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'white',
      }}
    />
  );
}