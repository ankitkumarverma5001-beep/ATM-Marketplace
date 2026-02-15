
import ProductCard from '@/components/ProductCard/ProductCard';
import { Product } from '@/lib/mockData';
import styles from './ProductList.module.css';

interface ProductListProps {
    products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
    return (
        <div className={styles.grid}>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
