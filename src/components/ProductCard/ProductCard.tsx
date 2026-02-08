import Image from 'next/image';
import styles from './ProductCard.module.css';

export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
}

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className={`${styles.card} glass`}>
            <div className={styles.imageWrapper}>
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className={styles.image}
                />
                {/* Using standard img for external placeholder to avoid Next.js config complexity for now. 
            In production, would use next/image with remotePatterns. */}
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{product.name}</h3>
                <p className={styles.description}>{product.description}</p>
                <div className={styles.footer}>
                    <span className={styles.price}>₹{product.price?.toLocaleString('en-IN') ?? 'N/A'}</span>
                    <button className={styles.button}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}
