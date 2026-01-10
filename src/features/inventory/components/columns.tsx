import type { ColumnDef } from '@tanstack/react-table';
import type { Product } from '../types/index';
import { ProductAction } from './ProductAction';

export const columns: ColumnDef<Product>[] = [
  {
    header: 'Imagen',
    accessorKey: 'image',
    cell: ({ row }) => (
      <img src={row.getValue('image')} alt="Producto" className="h-10 w-10 object-contain" />
    ),
  },
  {
    header: 'Producto',
    accessorKey: 'title',
    cell: ({ row }) => <div className="font-medium">{row.getValue('title')}</div>,
  },
  {
    header: 'Categoría',
    accessorKey: 'category',
  },
  {
    header: 'Precio',
    accessorKey: 'price',
    cell: ({ row }) => {
      const amount = row.getValue<number>('price');
      const formatted = new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
      }).format(amount);

      return <div className="font-bold">{formatted}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <ProductAction product={row.original} />;
    },
  },
];
