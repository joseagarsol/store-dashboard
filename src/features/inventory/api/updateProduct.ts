import type { Product } from '../types';

export interface UpdateProductDTO {
  title: string;
  price: number;
}

export const updateProduct = async (id: number, dto: UpdateProductDTO): Promise<Product> => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: dto.title,
      price: dto.price,
      category: 'electronic',
      description: 'updated via app',
      image: 'https://i.pravatar.cc',
    }),
  });

  if (!response.ok) {
    throw new Error('Error al actualizar el producto');
  }

  return response.json();
};
