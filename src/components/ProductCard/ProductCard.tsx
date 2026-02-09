import Link from 'next/link';
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
                        <span className={styles.price}>₹{product.price?.toLocaleString('en-IN') ?? 'N/A'}</span>
                        <button className={styles.button}>View Details</button>
                    </div>
                </div>
            </Link>
        </div>
    );
}
