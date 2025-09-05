import { Link } from "react-router-dom";
import styles from "./catalogCard.module.css";

export default function CatalogCard({ productData }) {
  
  return (
    <div className={styles.catalogCardContainer}>
      <Link
        to={`/product/${productData._id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className={styles.imageWrap}>
          <img
            className={styles.catalogCardImage}
            alt="productImg"
            src={productData.image}
          />
          <span className={styles.fullDetails}>View Full Details</span>
        </div>
      </Link>
      <div className={styles.catalogCardInfo}>
        <h1 className={styles.catalogCardName}>{productData.name}</h1>
        <p className={styles.catalogCardPrice}>${productData.price}</p>
      </div>
      <div className={styles.catalogCardButtons}>
        <button className={`${styles.catalogCardButton} ${styles.addToCart}`}>
          Add to Cart
        </button>
        <button className={styles.catalogCardButton}>Quick View</button>
      </div>
    </div>
  );
}
