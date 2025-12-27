import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, it, expect } from 'vitest';

describe('App Component', () => {
  it('renders the dashboard title correctly', () => {
    render(<App />);

    const titleElement = screen.getByText(/Store Dashboard/i);
    expect(titleElement).toBeInTheDocument();

    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
  });
});
