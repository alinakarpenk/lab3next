'use client'

import { useSession, signIn, signOut } from "next-auth/react"

export default function Login() {
  const { data: session, status } = useSession()

  if (!session) {
    return (
      <div>
        <p>Ви не увійшли в систему</p>
        <form>
<div>
    <input id="email" type="text" name="email" placeholder="Enter email"/>
    </div>
    <div>
    <input id="password" type="password" name="password" placeholder="Enter password"/>
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
