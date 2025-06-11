import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;


import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RegisterForm from '../components/RegisterForm';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../authSlice';  

const renderWithProviders = (ui, { initialState } = {}) => {
  const store = configureStore({
    reducer: { auth: authReducer },
    preloadedState: initialState,
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
};

describe('RegisterForm', () => {
  test('renders the form inputs', () => {
    renderWithProviders(<RegisterForm />);

    expect(screen.getByLabelText(/User Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
  });

  test('allows typing into input fields', () => {
    renderWithProviders(<RegisterForm />);

    const usernameInput = screen.getByLabelText(/User Name/i);
    fireEvent.change(usernameInput, { target: { value: 'JohnDoe' } });
    expect(usernameInput.value).toBe('JohnDoe');
  });

  test('shows error message if error exists', () => {
    renderWithProviders(<RegisterForm />, {
      initialState: {
        auth: { isLoading: false, error: 'Email already exists' },
      },
    });

    expect(screen.getByText('Email already exists')).toBeInTheDocument();
  });
});
