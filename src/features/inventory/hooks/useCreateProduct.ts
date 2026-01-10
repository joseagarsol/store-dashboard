import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type CreateProductDTO, createProduct } from '../api/createProduct';
import type { Product } from '../types';

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newProduct: CreateProductDTO) => createProduct(newProduct),

    onSuccess: (data) => {
      // Pedimos los datos al servidor de nuevo para tener la info actualizada
      //En este caso no lo usamos para que se pueda ver el cambio en la tabla al crear un producto
      //queryClient.invalidateQueries({ queryKey: ['products'] });

      queryClient.setQueryData(['products'], (oldData: Product[] | undefined) => {
        const newProduct: Product = {
          id: data.id,
          title: data.title,
          price: data.price,
          category: 'electronic',
          description: 'created via app',
          image: 'https://i.pravatar.cc/150?u=fake',
          rating: { rate: 0, count: 0 },
        };

        if (!oldData) return [newProduct];

        return [newProduct, ...oldData];
      });
      console.log('✅ Caché actualizada manualmente con el nuevo producto');
    },
  });
};
