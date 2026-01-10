import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DataTable } from './DataTable';
import { columns } from './columns';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

const createWrapper = (ui: ReactNode) => {
  const queryClient = new QueryClient();
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

const mockData = [
  {
    id: 1,
    title: 'Monitor Test',
    price: 100,
    category: 'tech',
    image: 'img.jpg',
    description: 'desc',
    rating: { rate: 5, count: 10 },
  },
  {
    id: 2,
    title: 'Teclado Mecánico',
    price: 50,
    category: 'electronics',
    image: 'keyboard.jpg',
    description: 'desc',
    rating: { rate: 5, count: 10 },
  },
];

describe('DataTable Component', () => {
  it('Should render the table with the correct data and format', () => {
    createWrapper(<DataTable columns={columns} data={mockData} />);

    expect(screen.getByText('Producto')).toBeInTheDocument();
    expect(screen.getByText('Monitor Test')).toBeInTheDocument();
    expect(screen.getByText('100,00 €')).toBeInTheDocument();
  });

  it('Should display a fallback message when there is no data', () => {
    createWrapper(<DataTable columns={columns} data={[]} />);

    expect(screen.getByText('No hay resultados.')).toBeInTheDocument();
  });

  it('Filters products by title when user types', async () => {
    const user = userEvent.setup();
    createWrapper(<DataTable columns={columns} data={mockData} />);

    const searchInput = screen.getByPlaceholderText('Filtrar productos...');

    expect(screen.getByText('Monitor Test')).toBeInTheDocument();
    expect(screen.getByText('Teclado Mecánico')).toBeInTheDocument();

    await user.type(searchInput, 'Monitor');

    expect(screen.getByText('Monitor Test')).toBeInTheDocument();
    expect(screen.queryByText('Teclado Mecánico')).not.toBeInTheDocument();
  });

  it('Should render paginate data correcly', async () => {
    const user = userEvent.setup();

    const manyProducts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      title: `Producto ${i}`,
      price: 100,
      category: 'test',
      image: 'image.jpg',
      description: 'desc',
      rating: { rate: 5, count: 10 },
    }));

    createWrapper(<DataTable columns={columns} data={manyProducts} />);

    expect(screen.getByText('Producto 1')).toBeInTheDocument();
    expect(screen.getByText('Producto 9')).toBeInTheDocument();
    expect(screen.queryByText('Producto 11')).not.toBeInTheDocument();

    const nextButton = screen.getByRole('button', { name: 'Siguiente' });
    const prevButton = screen.getByRole('button', { name: 'Anterior' });

    expect(prevButton).toBeDisabled();

    await user.click(nextButton);

    expect(screen.queryByText('Producto 1')).not.toBeInTheDocument();
    expect(screen.getByText('Producto 11')).toBeInTheDocument();

    expect(prevButton).not.toBeDisabled();
  });
});
