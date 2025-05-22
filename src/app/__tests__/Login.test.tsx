import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../components/Login'; // Шлях до компонента
import '@testing-library/jest-dom';
import { SessionProvider } from 'next-auth/react'

describe('Login', () => {
  it('renders a heading', () => {
    render(
      <SessionProvider session={null}>
        <Login />
      </SessionProvider>
    )

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })

 it('renders email and password input fields', () => {
    render(
      <SessionProvider session={null}>
        <Login />
      </SessionProvider>
    )

    const emailInput = screen.getByPlaceholderText('Email або логін')
    const passwordInput = screen.getByPlaceholderText('Пароль')

    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
  })
   it('should update the login and password fields on user input', async () => {
    render(
      <SessionProvider session={null}>
        <Login />
      </SessionProvider>
    )

    const emailInput = screen.getByPlaceholderText('Email або логін') as HTMLInputElement
    const passwordInput = screen.getByPlaceholderText('Пароль') as HTMLInputElement

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    expect(emailInput.value).toBe('test@example.com')
    expect(passwordInput.value).toBe('password123')
  })


  it('renders social login buttons', () => {
    render(
      <SessionProvider session={null}>
        <Login />
      </SessionProvider>
    )

    // Update the queries to match the exact text content of the buttons
    const googleButton = screen.getByRole('button', { name: /Увійти через Google/i })
    const githubButton = screen.getByRole('button', { name: /Увійти через GitHub/i })

    expect(googleButton).toBeInTheDocument()
    expect(githubButton).toBeInTheDocument()
  })

})
