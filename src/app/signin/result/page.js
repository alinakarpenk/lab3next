'use client';
import { useSession, signOut } from 'next-auth/react';

export default function Result(){
    const { data: session, status } = useSession();
    if (status === 'loading') {
      return <p>Завантаження...</p>;
    }
      if (!session) {
      return <p>Будь ласка, увійдіть у систему</p>;
    }
    return (
      <div>
        <p>Email: {session.user?.email}</p>
        <p>Name: {session.user?.name}</p>
        <button onClick={() => signOut()}>Вийти</button>
      </div>
    )
}