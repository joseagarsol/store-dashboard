import type { Product } from '../types';

export const deleteProduct = async (productId: number): Promise<Product> => {
  const response = await fetch(`https://fakestoreapi.com/products/${productId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error al eliminar el producto');
  }

  return response.json();
};
