import { Link } from 'react-router-dom'
import styles from './footer.module.css'

export default function Footer() {
    return(
        <div className={styles.footerContainer}>
        <div className={styles.footerData}>
            <div className={styles.footerInfo}>
                <h1 className={styles.footerName}>NDS</h1>
                <p className={styles.footerText}>Premium coffee beans, sourced ethically and roasted with passion</p>
            </div>
            <div className={styles.footerInfo}>
                <h1 className={styles.footerName}>Shop</h1>
                <Link to='/catalog' style={{ textDecoration: "none", color: "inherit" }}>
                    <p className={styles.footerText}>Coffe Beans</p>
                </Link>
            </div>
            <div className={styles.footerInfo}>
                <h1 className={styles.footerName}>Learn</h1>
                <p className={styles.footerText}>Our Story</p>
            </div>
            <div className={styles.footerSocials}>
                <img className={styles.social} src='/instagram-brands-solid-full.svg' alt='instagram' />
                <img className={styles.social} src='/twitter-brands-solid-full.svg' alt='instagram' />
                <img className={styles.social} src='/facebook-brands-solid-full.svg' alt='instagram' />
            </div>
        </div>
        <div className={styles.line}></div>
        <p className={styles.rights}>© NDS Co. All rights reserved.</p>
        </div>
    )
}