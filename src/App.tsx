import { useState } from 'react';
import './index.css';
import { DataTable } from '@/features/inventory/components/DataTable';
import { useProducts } from './features/inventory/hooks/useProducts';
import { columns } from './features/inventory/components/columns';
import { Button } from './components/ui/button';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from './components/ui/sheet';
import { CreateProductForm } from './features/inventory/components/CreateProductForm';
import { useCreateProduct } from './features/inventory/hooks/useCreateProduct';

function App() {
  const { data, isLoading, isError, error } = useProducts();
  const { mutate, isPending: isCreating } = useCreateProduct();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleCreateProduct = (formData: { title: string; price: number }) => {
    mutate(formData, {
      onSuccess: () => {
        setIsSheetOpen(false);
        alert('✅ Producto creado con éxito (FakeAPI)');
      },
      onError: () => {
        alert('❌ Error al crear el producto');
      },
    });
  };

  if (isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent">
            Cargando...
          </div>
        </div>
      </div>
    );

  if (isError) return <>Error: {error instanceof Error ? error.message : 'Error desconocido'}</>;

  return (
    <div className="container mx-auto py-10">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventario</h1>
          <p className="text-muted-foreground">Gestiona tu catálogo ({data?.length} items)</p>
        </div>

        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button>+ Nuevo Producto</Button>
          </SheetTrigger>

          <SheetContent>
            <SheetHeader>
              <SheetTitle>Añadir Producto</SheetTitle>
              <SheetDescription>
                Rellena los datos para crear un nuevo item en el inventario.
              </SheetDescription>
            </SheetHeader>

            <div className="mt-8">
              <CreateProductForm onSuccess={handleCreateProduct} isLoading={isCreating} />
            </div>
          </SheetContent>
        </Sheet>
      </header>
      <DataTable columns={columns} data={data || []} />
    </div>
  );
}

export default App;
