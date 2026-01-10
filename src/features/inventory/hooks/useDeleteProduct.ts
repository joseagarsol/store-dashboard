import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Product } from '../types';
import { deleteProduct } from '../api/deleteProduct';

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: number) => deleteProduct(productId),

    onSuccess: (_, productId) => {
      // Pedimos los datos al servidor de nuevo para tener la info actualizada
      //En este caso no lo usamos para que se pueda ver el cambio en la tabla al crear un producto
      //queryClient.invalidateQueries({ queryKey: ['products'] });

      queryClient.setQueryData(['products'], (oldData: Product[] | undefined) => {
        if (!oldData) return [];

        return oldData.filter((product) => product.id !== productId);
      });
      console.log(`🗑️ Producto ${productId} eliminado de la cache`);
    },
  });
};
