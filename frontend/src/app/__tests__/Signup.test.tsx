import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import SignUp from '../signup/page';
import { useDispatch, useSelector } from 'react-redux';

// Mock useDispatch and useSelector from react-redux
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

// Mock useRouter from next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('SignUp Component', () => {
  const mockDispatch = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    (useDispatch as any).mockReturnValue(mockDispatch);
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSelector as any).mockReturnValue({ loading: false, error: null, success: false });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders form inputs correctly', () => {
    render(<SignUp />);
    
    // Check if all form fields are present
    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('johndoe@email.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tell us about yourself')).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(<SignUp />);
    
    // Trigger form submission
    fireEvent.submit(screen.getByText('Sign Up'));
    
    // Check if error messages are shown
    expect(await screen.findByText('Name is required')).toBeInTheDocument();
    expect(await screen.findByText('Bio is required')).toBeInTheDocument();
  });

  it('displays password validation error', async () => {
    render(<SignUp />);
    
    // Input invalid password
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'short' },
    });
    
    // Submit form
    fireEvent.submit(screen.getByText('Sign Up'));

    // Check if password validation error is displayed
    expect(await screen.findByText(/Password must contain/)).toBeInTheDocument();
  });

  it('displays the CircularProgress when loading', () => {
    // Mock the loading state
    (useSelector as any).mockReturnValue({ loading: true, error: null, success: false });

    render(<SignUp />);

    // Check if CircularProgress is displayed
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('navigates to login on success', () => {
    // Mock the success state
    (useSelector as any).mockReturnValue({ loading: false, error: null, success: true });

    render(<SignUp />);

    // Expect navigation to login
    expect(mockPush).toHaveBeenCalledWith('login');
  });

  it('shows error message in Snackbar on registration error', async () => {
    // Mock the error state
    (useSelector as any).mockReturnValue({
      loading: false,
      error: 'Registration failed',
      success: false,
    });

    render(<SignUp />);

    // Check if error message is displayed in Snackbar
    expect(await screen.findByText('Registration failed')).toBeInTheDocument();
  });
});
