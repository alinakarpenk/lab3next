'use client'
import { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"

export default function Login() {
  const { data: session, status } = useSession()

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
          { 
              login, 
              password 
          }
      ),
    })
    const data = await res.json();
    if (res.ok) {
      window.location.href = '/signin/result';
    } else {
      setLogin('');
      setPassword('');
    }
  }
  if (!session) {
    return (
      <div>
        <p>Ви не увійшли в систему</p>
        <form onSubmit={handleSubmit}>
<div>
    <input id="login" type="text" name="login" placeholder="Enter login" value={login} onChange={(e) => setLogin(e.target.value)}/>
    </div>
    <div>
    <input id="password" type="password" name="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}/>
    </div>
    <div>
    <input type="submit" id="register" value="Увійти"/>
</div>
    <div>
      <p>Або</p>
    </div>
        <button onClick={() => signIn()}>Увійти через Google</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <p>Ви увійшли як {session.user?.email}</p>
      <button onClick={() => signOut()}>Вийти</button>
    </div>
  )
}
