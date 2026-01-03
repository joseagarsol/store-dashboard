import { renderHook, waitFor } from '@testing-library/react';
import { afterEach, describe, vi, it, expect } from 'vitest';
import { useProducts } from './useProducts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

const mockProducts = [
  { id: 1, title: 'Laptop', price: 999, category: 'electronics', image: 'img1.jpg' },
  { id: 2, title: 'Coffee', price: 10, category: 'food', image: 'img2.jpg' },
];

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useProducts Hook', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('Shoud fetch and return a list of products', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProducts),
        } as Response)
      )
    );

    const { result } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockProducts);

    expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products');
  });
});
