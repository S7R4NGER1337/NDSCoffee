import styles from './offer.module.css'

export default function Offer() {
    return(
        <div className={styles.offerContainer}>
            <h1 className={styles.offerName}>Limited-Time Offer</h1>
            <p className={styles.offerText}>Save 20% on our Premium Selection of Single Origin Coffee Beans. Don't miss out!</p>
            <button className={styles.offerButton}>Shop Now</button>
        </div>
    )
}