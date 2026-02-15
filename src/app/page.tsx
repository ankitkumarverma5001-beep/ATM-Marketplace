"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import ProductList from '@/components/ProductList/ProductList';
import { Product } from '@/lib/mockData';
import { CATEGORIES } from '@/lib/mockData';
import styles from './LandingPage.module.css';

// Mock Data Generator (Global Feed)
const generateProducts = (count: number): Product[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `generated-${i + 1}`,
    name: `Vintage Treasure #${i + 1}`,
    price: Math.floor(Math.random() * 4500) + 499,
    description: `A unique, pre-loved item looking for a new home. Verified quality and authentic vintage appeal.`,
    imageUrl: `https://placehold.co/400x300/e8e8e8/4A7C59?text=Item+${i + 1}`,
    category: 'Fashion', // Default for generated items
    storeId: 'store-1',
    condition: 'Good',
    details: ['Verified Authentic', 'Vintage Condition']
  }));
};

const ITEMS_PER_PAGE = 12;
const TOTAL_ITEMS = 100;
const allProducts = generateProducts(TOTAL_ITEMS);

export default function Home() {
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleProducts(allProducts.slice(0, ITEMS_PER_PAGE));
  }, []);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    setLoading(true);
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
      { threshold: 0.5 }
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
    <main className={styles.main}>
      <header className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>
            <span className="brand-text">My Local Mall</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Your neighborhood, digitalized.
            Discover local shops and receive everything at your doorstep.
          </p>

          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Search for products or shops..."
              className={`${styles.searchInput} glass`}
            />
            <button className={styles.searchButton}>Search</button>
          </div>
        </div>
      </header>

      <section className={styles.categoriesSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Browse by Category</h2>
          <div className={styles.categoryGrid}>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.id}`}
                className={`${styles.categoryCard} glass`}
              >
                <span className={styles.categoryIcon}>{cat.icon}</span>
                <span className={styles.categoryName}>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.feedSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Fresh Finds</h2>
          <ProductList products={visibleProducts} />

          <div ref={observerTarget} className={styles.loader}>
            {loading && <div className="spinner" />}
            {!hasMore && (
              <p className={styles.endMessage}>Discovering more treasures...</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
