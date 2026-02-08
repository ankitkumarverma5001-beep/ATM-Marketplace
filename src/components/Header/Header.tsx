
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={`${styles.header} glass`}>
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logoWrapper}>
                    <div className={styles.logoImage}>
                        <Image
                            src="/assets/logo.png"
                            alt="All Thrift Marketplace Logo"
                            width={50}
                            height={50}
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                    <div className={styles.logoText}>
                        <span className={styles.mainTitle}>
                            <span style={{ color: 'var(--primary-orange)' }}>All</span>
                            <span style={{ color: 'var(--primary-green)' }}> Thrift</span>
                        </span>
                        <span className={styles.subTitle}>Marketplace</span>
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
                    <Link href="#" className={styles.navLink}>Cart (0)</Link>
                </nav>
            </div>
        </header>
    );
}
