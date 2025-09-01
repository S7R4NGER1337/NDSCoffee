import { Link } from "react-router-dom";
import styles from "./heroSection.module.css";

export default function HeroSection() {
  return (
    <div className={styles.heroWrapper}>
        <img src="/mainBanner.jpg" alt="banner" className={styles.banner} />
      <div className={styles.heroSectionContainer}>
        <h1 className={styles.heroName}>The Finest Coffee Beans, Delivered</h1>
        <p className={styles.heroText}>
          Experience the rich aroma and exquisite taste of our ethically
          sourced, expertly roasted coffee beans.
        </p>
        <Link
          to={"/catalog"}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <button className={styles.bannerBtn}>Shop Coffee Beans</button>
        </Link>
      </div>
    </div>
  );
}
