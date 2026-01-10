import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useCreateProduct } from './useCreateProduct';

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useCreateProduct hook', () => {
  it('Send a POST requiest with correct data', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ id: 21, title: 'Test Product' }),
        } as Response)
      )
    );

    const { result } = renderHook(() => useCreateProduct(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({ title: 'New item', price: 99 });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(fetch).toHaveBeenCalledWith(
      'https://fakestoreapi.com/products',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          title: 'New item',
          price: 99,
          category: 'electronic',
          description: 'created via app',
          image: 'https://i.pravatar.cc',
        }),
      })
    );
  });
});
