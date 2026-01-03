import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DataTable } from './DataTable';
import { columns } from './columns';
import userEvent from '@testing-library/user-event';

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
    render(<DataTable columns={columns} data={mockData} />);

    expect(screen.getByText('Producto')).toBeInTheDocument();
    expect(screen.getByText('Monitor Test')).toBeInTheDocument();
    expect(screen.getByText('100,00 €')).toBeInTheDocument();
  });

  it('Should display a fallback message when there is no data', () => {
    render(<DataTable columns={columns} data={[]} />);

    expect(screen.getByText('No hay resultados.')).toBeInTheDocument();
  });

  it('Filters products by title when user types', async () => {
    const user = userEvent.setup();
    render(<DataTable columns={columns} data={mockData} />);

    const searchInput = screen.getByPlaceholderText('Filtrar productos...');

    expect(screen.getByText('Monitor Test')).toBeInTheDocument();
    expect(screen.getByText('Teclado Mecánico')).toBeInTheDocument();

    await user.type(searchInput, 'Monitor');

    expect(screen.getByText('Monitor Test')).toBeInTheDocument();
    expect(screen.queryByText('Teclado Mecánico')).not.toBeInTheDocument();
  });
});
