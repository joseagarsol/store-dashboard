import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type UpdateProductDTO, updateProduct } from '../api/updateProduct';
import type { Product } from '../types';

interface UpdateMutationVariables {
  id: number;
  data: UpdateProductDTO;
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateMutationVariables) => updateProduct(id, data),

    onSuccess: (data, variables) => {
      // Pedimos los datos al servidor de nuevo para tener la info actualizada
      //En este caso no lo usamos para que se pueda ver el cambio en la tabla al crear un producto
      //queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.setQueryData(['products'], (oldData: Product[] | undefined) => {
        if (!oldData) return [];

        return oldData.map((product) => {
          if (product.id === variables.id) {
            return { ...product, title: data.title, price: data.price };
          }

          return product;
        });
      });
    },
  });
};
