import type { Product } from '../types';

export interface CreateProductDTO {
  title: string;
  price: number;
}

export const createProduct = async (dto: CreateProductDTO): Promise<Product> => {
  const response = await fetch('https://fakestoreapi.com/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: dto.title,
      price: dto.price,
      category: 'electronic',
      description: 'created via app',
      image: 'https://i.pravatar.cc',
    }),
  });

  if (!response.ok) {
    throw new Error('Error al crear el producto');
  }

  return response.json();
};
