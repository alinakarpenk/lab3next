'use client'
import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Login() {
  const { data: session, status } = useSession();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      login,
      password,
      callbackUrl: 'http://localhost:3000/signin/result',
    });
    if (result?.ok && result.url) {
      window.location.href = result.url;
    } else {
      setError('Невірний логін або пароль');
      setLogin('');
      setPassword('');
    }
  };
  if (!session) {
    return (
      <div>
        <h1>Ви не увійшли в систему</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input id="login" type="text" name="login" placeholder="Email або логін" value={login} onChange={(e) => setLogin(e.target.value)} required
            />
          </div>
          <div>
            <input id="password" type="password" name="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required
            />
          </div>
          <div>
            <input type="submit" value="Увійти" />
          </div>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <p>Або</p>
          <button onClick={() => signIn('google', { callbackUrl: '/signin/result' })}>
            Увійти через Google
          </button>
          <button onClick={() => signIn('github', { callbackUrl: '/signin/result' })}>
            Увійти через GitHub
          </button>
        </div>
      </div>
    );
  }
  return 
}

