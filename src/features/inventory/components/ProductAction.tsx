import type { Product } from '../types';
import { useDeleteProduct } from '../hooks/useDeleteProduct';
import { useUpdateProduct } from '../hooks/useUpdateProduct';
import { ProductForm } from './ProductForm';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Trash2, Pencil } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useState } from 'react';

interface ProductActionProps {
  product: Product;
}

export function ProductAction({ product }: ProductActionProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();

  const handleDelete = () => {
    deleteProduct(product.id);
  };

  const handleEdit = (formData: { title: string; price: number }) => {
    updateProduct(
      { id: product.id, data: formData },
      {
        onSuccess: () => {
          setIsEditOpen(false);
          alert('✅ Producto editado con éxito (FakeAPI)');
        },
        onError: () => {
          alert('❌ Error al editar el producto');
        },
      }
    );
  };

  return (
    <div className="flex justify-end gap-2">
      <Sheet open={isEditOpen} onOpenChange={setIsEditOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="text-blue-600 hover:bg-blue-50">
            <Pencil className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Editar Producto</SheetTitle>
            <SheetDescription>Modifica los datos del producto ID: {product.id}</SheetDescription>
          </SheetHeader>
          <div className="mt-8">
            <ProductForm
              defaultValues={{ title: product.title, price: product.price }}
              onSuccess={handleEdit}
              isLoading={isUpdating}
            />
          </div>
        </SheetContent>
      </Sheet>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-500 hover:bg-red-50 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará permanentemente el producto <strong>{product.title}</strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={isDeleting}
            >
              {isDeleting ? 'Eliminando...' : 'Sí, Eliminar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
