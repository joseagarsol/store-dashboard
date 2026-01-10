import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { ProductForm } from './ProductForm';
import { render, screen, waitFor } from '@testing-library/react';

describe('CreateProductForm', () => {
  it('Should show validation errors when submitting an empty form', async () => {
    const user = userEvent.setup();

    const onSubmitMock = vi.fn();

    render(<ProductForm onSuccess={onSubmitMock} />);

    const submitBtn = screen.getByRole('button', { name: 'Guardar' });
    await user.click(submitBtn);

    expect(await screen.findByText(/el título es obligatorio/i)).toBeInTheDocument();
    expect(await screen.findByText(/el precio debe ser positivo/i)).toBeInTheDocument();

    expect(onSubmitMock).not.toHaveBeenCalled();
  });

  it('Should submits correctly when data is valid', async () => {
    const user = userEvent.setup();
    const onSubmitMock = vi.fn();

    render(<ProductForm onSuccess={onSubmitMock} />);

    const titleInput = screen.getByLabelText(/nombre del producto/i);
    await user.type(titleInput, 'Test Product');

    const priceInput = screen.getByLabelText(/precio/i);
    await user.type(priceInput, '99.99');

    const submitBtn = screen.getByRole('button', { name: 'Guardar' });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalled();
    });
  });
});
