"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import ProductList from '@/components/ProductList/ProductList';
import { Product } from '@/components/ProductCard/ProductCard';

// Mock Data Generator
const generateProducts = (count: number): Product[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Vintage Treasure #${i + 1}`,
    price: Math.floor(Math.random() * 4500) + 499,
    description: `A unique, pre-loved item looking for a new home. Verified quality and authentic vintage appeal. Item #${i + 1} from our collection.`,
    imageUrl: `https://placehold.co/400x300/e8e8e8/4A7C59?text=Item+${i + 1}`,
  }));
};

const ITEMS_PER_PAGE = 12; // Smaller batch for smoother loading
const TOTAL_ITEMS = 100;
const allProducts = generateProducts(TOTAL_ITEMS);

export default function Home() {
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Ref for the element that triggers loading more items
  const observerTarget = useRef<HTMLDivElement>(null);

  // Initialize with first batch
  useEffect(() => {
    setVisibleProducts(allProducts.slice(0, ITEMS_PER_PAGE));
  }, []);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);

    // Simulate network delay for "social media" feel
    setTimeout(() => {
      setVisibleProducts((prev) => {
        const nextBatch = allProducts.slice(prev.length, prev.length + ITEMS_PER_PAGE);
        if (prev.length + nextBatch.length >= TOTAL_ITEMS) {
          setHasMore(false);
        }
        return [...prev, ...nextBatch];
      });
      setLoading(false);
    }, 800);
  }, [loading, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the loader is visible
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [loadMore]);

  return (
    <main style={{ paddingTop: '110px', paddingBottom: '60px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '16px', color: 'var(--foreground)' }}>
            <span className="title-gradient">Fresh Finds</span>
          </h1>
          <p style={{ color: '#636e72', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            Sustainable style for everyone. Discover curated vintage pieces and thrifted treasures.
          </p>
        </div>

        <ProductList products={visibleProducts} />

        {/* Loading / Sentinel Element */}
        <div
          ref={observerTarget}
          style={{
            marginTop: '40px',
            textAlign: 'center',
            padding: '20px',
            opacity: hasMore ? 1 : 0,
            transition: 'opacity 0.3s'
          }}
        >
          {loading && (
            <div style={{ display: 'inline-block' }}>
              <div className="spinner" style={{
                width: '30px',
                height: '30px',
                border: '3px solid rgba(var(--primary-green-rgb), 0.3)',
                borderRadius: '50%',
                borderTopColor: 'var(--primary-green)',
                animation: 'spin 1s ease-in-out infinite'
              }} />
              <style jsx>{`
                @keyframes spin {
                  to { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          )}
          {!hasMore && visibleProducts.length > 0 && (
            <p style={{ color: '#888', fontStyle: 'italic' }}>You've reached the end!</p>
          )}
        </div>
      </div>
    </main>
  );
}
