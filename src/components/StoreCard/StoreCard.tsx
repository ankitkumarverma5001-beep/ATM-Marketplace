import Link from 'next/link';
import { Store } from '@/lib/mockData';
import styles from './StoreCard.module.css';

interface StoreCardProps {
    store: Store;
}

export default function StoreCard({ store }: StoreCardProps) {
    return (
        <Link href={`/store/${store.id}`} className={styles.cardLink}>
            <div className={`${styles.card} glass`}>
                <div className={styles.logoWrapper}>
                    <img src={store.logoUrl} alt={store.name} className={styles.logo} />
                </div>
                <div className={styles.content}>
                    <div className={styles.badge}>{store.category}</div>
                    <h3 className={styles.title}>{store.name}</h3>
                    <p className={styles.description}>{store.description}</p>
                    <div className={styles.footer}>
                        <span className={styles.rating}>⭐ {store.rating}</span>
                        <span className={styles.location}>📍 {store.location}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
