import { describe, it, expect, vi, afterEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useUpdateProduct } from './useUpdateProduct';
import { renderHook, waitFor } from '@testing-library/react';

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useUpdateProduct', () => {
  afterEach(() => vi.restoreAllMocks());

  it('send a PUT request with updated data', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ id: 1, title: 'Updated title', price: 500 }),
        } as Response)
      )
    );

    const { result } = renderHook(() => useUpdateProduct(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({ id: 1, data: { title: 'Updated title', price: 500 } });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(fetch).toHaveBeenCalledWith(
      'https://fakestoreapi.com/products/1',
      expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify({
          title: 'Updated title',
          price: 500,
          category: 'electronic',
          description: 'updated via app',
          image: 'https://i.pravatar.cc',
        }),
      })
    );
  });
});
