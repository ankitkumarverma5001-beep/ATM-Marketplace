"use client";

import { useParams } from 'next/navigation';
import { MOCK_STORES, CATEGORIES } from '@/lib/mockData';
import StoreCard from '@/components/StoreCard/StoreCard';
import styles from './CategoryPage.module.css';

export default function CategoryPage() {
    const params = useParams();
    const categoryId = params.id as string;
    const category = CATEGORIES.find(c => c.id === categoryId);

    const filteredStores = MOCK_STORES.filter(
        s => s.category.toLowerCase() === categoryId.toLowerCase()
    );

    if (!category) {
        return <div className="container" style={{ paddingTop: '150px' }}>Category not found</div>;
    }

    return (
        <main className={styles.main}>
            <div className="container">
                <header className={styles.header}>
                    <span className={styles.icon}>{category.icon}</span>
                    <h1 className={styles.title}>{category.name} Shops</h1>
                    <p className={styles.subtitle}>
                        Discover the best {category.name.toLowerCase()} thrift stores in your area.
                    </p>
                </header>

                <div className={styles.grid}>
                    {filteredStores.length > 0 ? (
                        filteredStores.map(store => (
                            <StoreCard key={store.id} store={store} />
                        ))
                    ) : (
                        <p className={styles.empty}>No shops found in this category yet.</p>
                    )}
                </div>
            </div>
        </main>
    );
}
