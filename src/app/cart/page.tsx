"use client";

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import styles from './CartPage.module.css';

export default function CartPage() {
    const { cartItems, removeFromCart, totalItems, totalPrice } = useCart();

    return (
        <main className={styles.main}>
            <div className="container">
                <Breadcrumbs />
                <h1 className={styles.title}>Your Shopping Cart</h1>

                {cartItems.length > 0 ? (
                    <div className={styles.cartContent}>
                        <div className={styles.cartList}>
                            {cartItems.map(item => (
                                <div key={item.id} className={styles.cartItem}>
                                    <img src={item.imageUrl} alt={item.name} className={styles.itemImage} />
                                    <div className={styles.itemDetails}>
                                        <h3>{item.name}</h3>
                                        <p>Condition: {item.condition}</p>
                                    </div>
                                    <div className={styles.quantity}>
                                        <span>Qty: {item.quantity}</span>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                        <span className={styles.itemPrice}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                                        <button
                                            className={styles.removeButton}
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.summary}>
                            <h2 className={styles.summaryTitle}>Order Summary</h2>
                            <div className={styles.summaryRow}>
                                <span>Subtotal ({totalItems} items)</span>
                                <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span>Shipping</span>
                                <span style={{ color: 'green' }}>Free</span>
                            </div>
                            <div className={styles.totalRow}>
                                <span>Total</span>
                                <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                            </div>
                            <button className={styles.checkoutButton} onClick={() => alert('Checkout flow not implemented yet!')}>
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className={styles.emptyCart}>
                        <p>Your cart is empty.</p>
                        <Link href="/" className={styles.continueButton}>
                            Continue Shopping
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
}
