"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import styles from './Header.module.css';

export default function Header() {
    const { totalItems } = useCart();

    return (
        <header className={`${styles.header} glass`}>
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logoWrapper}>
                    <div className={styles.logoImage}>
                        <Image
                            src="/assets/logo.png"
                            alt="My Local Mall Logo"
                            width={50}
                            height={50}
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                    <div className={styles.logoText}>
                        <span className={styles.mainTitle}>
                            <span style={{ color: 'var(--primary-orange)' }}>My</span>
                            <span style={{ color: 'var(--primary-green)' }}> Local</span>
                        </span>
                        <span className={styles.subTitle}>Mall</span>
                    </div>
                </Link>

                <input type="checkbox" id="nav-toggle" className={styles.navToggle} />
                <label htmlFor="nav-toggle" className={styles.hamburger}>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                </label>

                <nav className={styles.nav}>
                    <Link href="#" className={styles.navLink}>Categories</Link>
                    <Link href="#" className={styles.navLink}>Deals</Link>
                    <Link href="/cart" className={`${styles.navLink} ${styles.cartLink}`}>
                        Cart
                        {totalItems > 0 && (
                            <span className={styles.cartBadge}>{totalItems}</span>
                        )}
                    </Link>
                </nav>
            </div>
        </header>
    );
}
