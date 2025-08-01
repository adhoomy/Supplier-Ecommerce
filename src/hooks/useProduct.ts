import { useState, useEffect } from 'react';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UseProductReturn {
  product: Product | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useProduct(productId: string): UseProductReturn {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/products/${productId}`);
      
      if (!response.ok) {
        throw new Error('Product not found');
      }
      
      const result = await response.json();
      
      if (result.success) {
        setProduct(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch product');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const refetch = () => {
    fetchProduct();
  };

  return { product, loading, error, refetch };
} 