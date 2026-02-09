"use client";

import { useState, useRef, useEffect, useCallback, use } from 'react';
import { useParams } from 'next/navigation';
import ProductList from '@/components/ProductList/ProductList';
import { Product } from '@/components/ProductCard/ProductCard';
import { MOCK_STORES } from '@/lib/mockData';
import styles from './StorePage.module.css';

// Mock Data Generator for Store Specific Products
const generateStoreProducts = (storeId: string, count: number): Product[] => {
    return Array.from({ length: count }, (_, i) => ({
        id: Number(`${storeId.replace('store-', '')}${i + 1}`),
        name: `Store Item #${i + 1}`,
        price: Math.floor(Math.random() * 4500) + 499,
        description: `A unique find from ${MOCK_STORES.find(s => s.id === storeId)?.name || 'this store'}. Condition: Excellent.`,
        imageUrl: `https://placehold.co/400x300/e8e8e8/4A7C59?text=Store+${storeId}+Item+${i + 1}`,
    }));
};

const ITEMS_PER_PAGE = 12;

export default function StorePage() {
    const params = useParams();
    const storeId = params.id as string;
    const store = MOCK_STORES.find(s => s.id === storeId);

    const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const allProducts = useRef<Product[]>([]);
    const observerTarget = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (storeId) {
            allProducts.current = generateStoreProducts(storeId, 48); // Generate 48 items per store
            setVisibleProducts(allProducts.current.slice(0, ITEMS_PER_PAGE));
        }
    }, [storeId]);

    const loadMore = useCallback(() => {
        if (loading || !hasMore) return;

        setLoading(true);

        setTimeout(() => {
            setVisibleProducts((prev) => {
                const nextBatch = allProducts.current.slice(prev.length, prev.length + ITEMS_PER_PAGE);
                if (prev.length + nextBatch.length >= allProducts.current.length) {
                    setHasMore(false);
                }
                return [...prev, ...nextBatch];
            });
            setLoading(false);
        }, 600);
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

    if (!store) {
        return (
            <div className="container" style={{ paddingTop: '150px', textAlign: 'center' }}>
                <h1>Store Not Found</h1>
                <p>The store you are looking for does not exist or has moved.</p>
            </div>
        );
    }

    return (
        <main className={styles.main}>
            <div className={`${styles.hero} glass`}>
                <div className="container">
                    <div className={styles.headerContent}>
                        <div className={styles.logoWrapper}>
                            <img src={store.logoUrl} alt={store.name} className={styles.logo} />
                        </div>
                        <div className={styles.info}>
                            <div className={styles.badge}>{store.category}</div>
                            <h1 className={styles.title}>{store.name}</h1>
                            <p className={styles.description}>{store.description}</p>
                            <div className={styles.meta}>
                                <span>⭐ {store.rating} Rating</span>
                                <span className={styles.dot}>•</span>
                                <span>📍 {store.location}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <h2 className={styles.sectionTitle}>Shop Items</h2>
                <ProductList products={visibleProducts} />

                <div ref={observerTarget} className={styles.loader}>
                    {loading && <div className="spinner" />}
                    {!hasMore && visibleProducts.length > 0 && (
                        <p className={styles.endMessage}>End of collection</p>
                    )}
                </div>
            </div>
        </main>
    );
}
