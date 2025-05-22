import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useSession, signOut } from 'next-auth/react';
import Result from '../signin/result/page';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  signOut: jest.fn(),
}));

describe('Result Component', () => {
  it('"Завантаження..." під час завантаження', () => {
    (useSession as jest.Mock).mockReturnValue({ data: null, status: 'loading' });
    render(<Result />);
    expect(screen.getByText(/Завантаження.../i)).toBeInTheDocument();
  });

  it('показує дані користувача та кнопку виходу при успішному вході', () => {
    const mockSession = {
      user: {
        email: 'test@gmail.com',
        name: 'Test User',
      },
    };
    (useSession as jest.Mock).mockReturnValue({ data: mockSession, status: 'authenticated' });
    render(<Result />);
    expect(screen.getByText(/Email: test@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Name: Test User/i)).toBeInTheDocument();
    expect(screen.getByText(/Вийти/i)).toBeInTheDocument();
  });
});
