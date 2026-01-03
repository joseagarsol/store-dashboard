import './index.css';
import { DataTable } from '@/features/inventory/components/DataTable';
import { useProducts } from './features/inventory/hooks/useProducts';
import { columns } from './features/inventory/components/columns';

function App() {
  const { data, isLoading, isError, error } = useProducts();

  if (isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="animate-pulse text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <p className="font-bold">Ha ocurrido un error</p>
          <p className="text-sm">{error?.message}</p>
        </div>
      </div>
    );

  return (
    <div className="p-10">
      <DataTable columns={columns} data={data || []} />
    </div>
  );
}

export default App;
