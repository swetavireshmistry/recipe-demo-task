// RecipeForm.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { createRecipe } from '@/store/slices/createrecipe';
import { useForm } from 'react-hook-form';
import RecipeForm from '../recipes/create/page';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../hooks/useAuth';
import userEvent from '@testing-library/user-event';

// Mock the external hooks and functions
jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn()
}));
jest.mock('@/store/slices/createrecipe', () => ({
    createRecipe: jest.fn(),
}));
jest.mock('../hooks/useAuth', () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock('react-hook-form', () => ({
    useForm: jest.fn(),
}));

// Mock useRouter from next/navigation
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('RecipeForm Component', () => {
    // Set up mocks before each test
    const dispatchMock = jest.fn();
    const useFormMock = {
        handleSubmit: jest.fn((callback) => {
            callback({ title: 'Test Recipe', photo: 'photo.png', ingredients: [], instructions: [] });
        }),
        register: jest.fn(),
        formState: { errors: {} },
        setValue: jest.fn(),
        control: jest.fn(),
    };

    beforeEach(() => {
        // Mock useAuth to return authenticated status
        (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: true });
        // Mock useDispatch to return a mock function
        (useDispatch as any).mockReturnValue(dispatchMock);
        // Mock useForm to return form methods
        (useForm as jest.Mock).mockReturnValue(useFormMock);
        (useSelector as any).mockReturnValue({ userId: "1" });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render the form correctly', () => {
        render(<RecipeForm />);
        expect(screen.getByText(/create recipe/i)).toBeTruthy();
        expect(screen.getByLabelText(/title/i)).toBeTruthy();
        expect(screen.getByLabelText(/upload photo/i)).toBeTruthy();
        expect(screen.getByText(/ingredients/i)).toBeTruthy();
        expect(screen.getByText(/instructions/i)).toBeTruthy();
        expect(screen.getByText(/submit recipe/i)).toBeTruthy();
    });
});
