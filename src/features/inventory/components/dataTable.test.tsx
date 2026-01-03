import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DataTable } from './DataTable';
import { columns } from './columns';

const mockData = [
  {
    id: 1,
    title: 'Monitor Test',
    price: 100, // Nos fijaremos si esto se renderiza como $100.00
    category: 'tech',
    image: 'img.jpg',
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

  it('should display a fallback message when there is no data', () => {
    render(<DataTable columns={columns} data={[]} />);

    expect(screen.getByText('No hay resultados.')).toBeInTheDocument();
  });
});
