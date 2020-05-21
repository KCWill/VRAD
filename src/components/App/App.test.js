import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { render, cleanup, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from "react-router-dom";


describe('App', () => {
  it('should be able to view header on login page when app loads', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(getByText('Vacation Rentals Around Denver')).toBeInTheDocument();
  })
})

