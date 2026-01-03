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
          <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent">
            Cargando...
          </div>
        </div>
      </div>
    );

  if (isError) return <>Error: {error instanceof Error ? error.message : 'Error desconocido'}</>;

  return (
    <div className="p-10">
      <DataTable columns={columns} data={data || []} />
    </div>
  );
}

export default App;
