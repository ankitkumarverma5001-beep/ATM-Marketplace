"use client";

import { useParams } from 'next/navigation';
import { MOCK_PRODUCTS, MOCK_STORES, getProductById } from '@/lib/mockData';
import { useCart } from '@/context/CartContext';
import StoreCard from '@/components/StoreCard/StoreCard';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import styles from './ProductDetail.module.css';

export default function ProductDetailPage() {
    const params = useParams();
    const productId = params.id as string;
    const { addToCart } = useCart();

    const product = getProductById(productId);

    if (!product) {
        return <div className="container" style={{ paddingTop: '150px' }}>Product not found</div>;
    }

    const store = MOCK_STORES.find(s => s.id === product.storeId);

    // Suggest other products from the same category as "Related"
    // Or other stores in the same category
    const relatedStores = MOCK_STORES.filter(s => s.category === product.category && s.id !== product.storeId).slice(0, 3);

    const handleAddToCart = () => {
        addToCart(product);
        alert(`Added ${product.name} to cart!`);
    };

    return (
        <main className={styles.main}>
            <div className="container">
                <Breadcrumbs />
                <div className={styles.productSection}>
                    <div className={styles.imageGallery}>
                        <div className={`${styles.mainImageWrapper} glass`}>
                            <img src={product.imageUrl} alt={product.name} className={styles.mainImage} />
                        </div>
                    </div>

                    <div className={styles.productInfo}>
                        <h1 className={styles.title}>{product.name}</h1>
                        <p className={styles.price}>₹{product.price.toLocaleString('en-IN')}</p>

                        <div className={styles.storeInfo}>
                            <p>Sold by: <strong>{store?.name || 'Unknown Store'}</strong></p>
                            <p className={styles.condition}>Condition: {product.condition}</p>
                        </div>

                        <div className={styles.descriptionSection}>
                            <h3>Description</h3>
                            <p>{product.description}</p>
                        </div>

                        <div className={styles.detailsList}>
                            {product.details.map((detail, i) => (
                                <div key={i} className={styles.detailItem}>
                                    <span className={styles.check}>✓</span> {detail}
                                </div>
                            ))}
                        </div>

                        <button
                            className={styles.buyButton}
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>

                <section className={styles.sellersSection}>
                    <h2 className={styles.sectionTitle}>More shops for {product.category}</h2>
                    <p className={styles.sectionSubtitle}>Explore other local vendors in this category.</p>

                    <div className={styles.storesGrid}>
                        {relatedStores.length > 0 ? (
                            relatedStores.map(store => (
                                <StoreCard key={store.id} store={store} />
                            ))
                        ) : (
                            <p>No other stores found in this category.</p>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}
