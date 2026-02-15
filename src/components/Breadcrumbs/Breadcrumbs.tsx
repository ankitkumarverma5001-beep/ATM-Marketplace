"use client";

import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { CATEGORIES, MOCK_STORES, getProductById } from '@/lib/mockData';
import styles from './Breadcrumbs.module.css';

export default function Breadcrumbs() {
    const pathname = usePathname();
    const params = useParams(); // params might be empty if not in a dynamic route

    // We construct the path manually based on where we are
    const segments = pathname.split('/').filter(Boolean);
    const type = segments[0]; // 'category', 'store', 'product', 'cart'
    const id = params?.id as string | undefined;

    const breadcrumbs = [
        { name: 'Home', href: '/', icon: true }
    ];

    if (type === 'category' && id) {
        const category = CATEGORIES.find(c => c.id === id);
        if (category) {
            breadcrumbs.push({ name: category.name, href: `/category/${id}`, icon: false });
        }
    } else if (type === 'store' && id) {
        const store = MOCK_STORES.find(s => s.id === id);
        // If we have a store, we can try to find its category name
        if (store) {
            const category = CATEGORIES.find(c => c.name.toLowerCase() === store.category.toLowerCase());

            // Add Category Link
            if (category) {
                breadcrumbs.push({ name: category.name, href: `/category/${category.id}`, icon: false });
            } else {
                // Fallback if category not found in list
                breadcrumbs.push({ name: store.category, href: '#', icon: false });
            }

            // Add Store Link
            breadcrumbs.push({ name: store.name, href: `/store/${id}`, icon: false });
        }
    } else if (type === 'product' && id) {
        const product = getProductById(id);
        if (product) {
            const store = MOCK_STORES.find(s => s.id === product.storeId);

            // Add Category
            if (store && store.category) {
                const category = CATEGORIES.find(c => c.name.toLowerCase() === store.category.toLowerCase());
                if (category) {
                    breadcrumbs.push({ name: category.name, href: `/category/${category.id}`, icon: false });
                } else {
                    breadcrumbs.push({ name: store.category, href: '#', icon: false });
                }
            } else if (product.category) {
                // Fallback category from product
                const category = CATEGORIES.find(c => c.name.toLowerCase() === product.category.toLowerCase());
                if (category) {
                    breadcrumbs.push({ name: category.name, href: `/category/${category.id}`, icon: false });
                }
            }

            // Add Store
            if (store) {
                breadcrumbs.push({ name: store.name, href: `/store/${store.id}`, icon: false });
            }

            // Add Product (Current)
            breadcrumbs.push({ name: product.name, href: `/product/${id}`, icon: false });
        }
    } else if (type === 'cart') {
        breadcrumbs.push({ name: 'Shopping Cart', href: '/cart', icon: false });
    }

    return (
        <nav className={`container ${styles.breadcrumbs}`}>
            {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;

                return (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {index > 0 && <span className={styles.separator}>/</span>}

                        {isLast ? (
                            <span className={styles.current}>{crumb.name}</span>
                        ) : (
                            <Link href={crumb.href} className={styles.link}>
                                {crumb.icon ? (
                                    <span className={styles.homeIcon}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                        </svg>
                                    </span>
                                ) : (
                                    crumb.name
                                )}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
