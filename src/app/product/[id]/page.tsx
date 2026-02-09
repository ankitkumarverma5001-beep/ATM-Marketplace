"use client";

import { useParams } from 'next/navigation';
import { MOCK_STORES } from '@/lib/mockData';
import StoreCard from '@/components/StoreCard/StoreCard';
import styles from './ProductDetail.module.css';

export default function ProductDetailPage() {
    const params = useParams();
    const productId = params.id as string;

    // Mock product data based on ID
    const product = {
        id: productId,
        name: `Vintage Treasure #${productId}`,
        price: 2499,
        description: "This is a meticulously curated vintage piece, verified for quality and authenticity. It represents a unique era of design and craftsmanship.",
        imageUrl: `https://placehold.co/800x600/e8e8e8/4A7C59?text=Product+${productId}`,
        details: [
            "100% Authentic Vintage",
            "Condition: Excellent (Pre-loved)",
            "Verified by ATM Quality Check",
            "Material: Organic Cotton / Mixed Fibers"
        ]
    };

    // Fulfilling the requirement: "stores related to the product the user is looking of"
    // We mock this by selecting a subset of stores
    const relatedStores = MOCK_STORES.slice(0, 3);

    return (
        <main className={styles.main}>
            <div className="container">
                <div className={styles.productSection}>
                    <div className={styles.imageGallery}>
                        <div className={`${styles.mainImageWrapper} glass`}>
                            <img src={product.imageUrl} alt={product.name} className={styles.mainImage} />
                        </div>
                    </div>

                    <div className={styles.productInfo}>
                        <h1 className={styles.title}>{product.name}</h1>
                        <p className={styles.price}>₹{product.price.toLocaleString('en-IN')}</p>

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

                        <button className={styles.buyButton}>Add to Cart</button>
                    </div>
                </div>

                <section className={styles.sellersSection}>
                    <h2 className={styles.sectionTitle}>Available at these Stores</h2>
                    <p className={styles.sectionSubtitle}>Find this item and more at these verified local shops.</p>

                    <div className={styles.storesGrid}>
                        {relatedStores.map(store => (
                            <StoreCard key={store.id} store={store} />
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
