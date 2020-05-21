import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App/App';
import { render, cleanup, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from "react-router-dom";


describe('Login', () => {

  it('should be able to see the login form on app on load', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(getByText('Name:')).toBeInTheDocument();
    expect(getByText('Email:')).toBeInTheDocument();
  })

  it('should be able to login', () => {
    const { getByText, getByPlaceholderText, getByDisplayValue } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    
    fireEvent.change(getByPlaceholderText('Name'), {target: {value: 'Léah'}});
    fireEvent.change(getByPlaceholderText('Email'), {target: {value: 'test@test.com'}});
    fireEvent.change(getByDisplayValue('Vacation'), {target: {value: 'Vacation'}});
    fireEvent.click(getByText('Sign In!'));
    expect(getByText('Welcome, Léah')).toBeInTheDocument();
  })

  it('should not login if all inputs on form are not filled out', () => {
    const { getByText, getByPlaceholderText, getByDisplayValue } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    fireEvent.change(getByPlaceholderText('Name'), {target: {value: 'Léah'}});
    fireEvent.change(getByPlaceholderText('Email'), {target: {value: ''}});
    fireEvent.change(getByDisplayValue('Vacation'), {target: {value: 'Vacation'}});
    fireEvent.click(getByText('Sign In!'));
    const handleSubmit = jest.fn();
    expect(handleSubmit).not.toHaveBeenCalled();
  })
})
