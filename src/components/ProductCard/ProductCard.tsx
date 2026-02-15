"use client";

import Link from 'next/link';
import { Product } from '@/lib/mockData';
import { useCart } from '@/context/CartContext';
import styles from './ProductCard.module.css';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation if inside a link
        e.stopPropagation();
        addToCart(product);
        alert(`Added ${product.name} to cart!`); // Simple feedback for now
    };

    return (
        <div className={`${styles.card} glass`}>
            <Link href={`/product/${product.id}`} className={styles.link}>
                <div className={styles.imageWrapper}>
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className={styles.image}
                    />
                </div>
                <div className={styles.content}>
                    <h3 className={styles.title}>{product.name}</h3>
                    <p className={styles.description}>{product.description}</p>
                    <div className={styles.footer}>
                        <span className={styles.price}>₹{product.price.toLocaleString('en-IN')}</span>
                        <button
                            className={styles.button}
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </Link>
        </div>
    );
}
