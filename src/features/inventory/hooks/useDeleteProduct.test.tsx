import { describe, it, expect, vi, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useDeleteProduct } from './useDeleteProduct';

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useDeleteProduct', () => {
  afterEach(() => vi.restoreAllMocks());

  it('send a DELETE request for a specific product id', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ id: 1, title: 'Deleted item' }),
        } as Response)
      )
    );

    const { result } = renderHook(() => useDeleteProduct(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(1);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(fetch).toHaveBeenCalledWith(
      'https://fakestoreapi.com/products/1',
      expect.objectContaining({
        method: 'DELETE',
      })
    );
  });
});
