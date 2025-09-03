import styles from "./offer.module.css";
import { Link } from "react-router-dom";

export default function Offer() {
  return (
    <div className={styles.offerContainer}>
      <h1 className={styles.offerName}>Limited-Time Offer</h1>
      <p className={styles.offerText}>
        Save 20% on our Premium Selection of Single Origin Coffee Beans. Don't
        miss out!
      </p>
      <Link to="/catalog" style={{color: 'inherit', textDecoration: 'none'}}>
        <button className={styles.offerButton}>Shop Now</button>
      </Link>
    </div>
  );
}
