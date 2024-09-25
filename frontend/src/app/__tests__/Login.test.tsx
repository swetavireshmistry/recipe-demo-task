import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import Login from '../login/page';
import configureStore from 'redux-mock-store';
import { loginUser } from '@/store/slices/authSlice';

// Mocking Next.js useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
    asPath: '',
    route: '',
    query: {},
    pathname: '',
  }),
}));

// Mocking custom useAuth hook
jest.mock('../hooks/useAuth', () => ({
  __esModule: true,
  default: jest.fn(() => ({ isAuthenticated: false })),
}));

// Mocking loginUser as a jest function
jest.mock('@/store/slices/authSlice', () => ({
  loginUser: jest.fn(),
}));

const mockStore = configureStore([]);

describe('Login Component', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      auth: {
        loading: false,
        error: null,
      },
    });
    jest.clearAllMocks();

    // Cast to unknown then to jest.Mock to avoid TypeScript errors
    (loginUser as unknown as jest.Mock).mockImplementation((credentials) => {
      return new Promise((resolve, reject) => {
        if (credentials.email === 'test@test.com' && credentials.password === 'Bb@12341234') {
          resolve({ user: { email: credentials.email } });
        } else {
          reject(new Error('Login failed.'));
        }
      });
    });
  });

  test('renders the login form', () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    expect(screen.getByRole('heading', { name: /welcome/i })).toBeTruthy();
    expect(screen.getByLabelText(/email/i)).toBeTruthy();
    expect(screen.getByLabelText(/password/i)).toBeTruthy();
    expect(screen.getByRole('button', { name: /log in/i })).toBeTruthy();
  });
});
