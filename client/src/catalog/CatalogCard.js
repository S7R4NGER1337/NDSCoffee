import { Link } from "react-router-dom";
import styles from "./catalogCard.module.css";

export default function CatalogCard({ productData }) {
  return (
    <Link
      to={`/product/${productData._id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className={styles.catalogCardContainer}>
        <img
          className={styles.catalogCardImage}
          alt="productImg"
          src={productData.image}
        />
        <h1 className={styles.catalogCardname}>{productData.name}</h1>
        <p className={styles.catalogCardPrice}>{productData.price} лв</p>
        <button className={styles.catalogCardButton}>More Info</button>
      </div>
    </Link>
  );
}
