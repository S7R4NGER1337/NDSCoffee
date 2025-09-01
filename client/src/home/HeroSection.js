import { Link } from "react-router-dom";
import styles from './heroSection.module.css'

export default function HeroSection() {
  return (
    <div className={styles.banner}>
      <h1 className={styles.bannerName}>NDS Coffee</h1>
      <p className={styles.bannerText}>
        Carefully selected beans from the world's finest plantations.
      </p>
      <Link
        to={"/catalog"}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <button className={styles.bannerBtn}>Explore Catalog</button>
      </Link>
    </div>
  );
}
