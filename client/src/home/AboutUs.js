import styles from "./aboutUs.module.css";

export default function AboutUs() {
  return (
    <div className={styles.aboutUsSection}>
      <h1 className={styles.aboutUsHeader}>About us</h1>
      <div className={styles.aboutUsInfo}>
        <img alt="aboutUs" src="aboutUs.png" className={styles.aboutUsImg} />
        <p className={styles.aboutUsText}>
          At NDS, we believe every cup of coffee is an opportunity for delight.
          Our mission is to deliver carefully selected, freshly roasted coffee
          beans directly to your home. We are passionate about coffee and strive
          to share that experience with every customer, offering not just a
          product, but a ritual.
        </p>
      </div>
    </div>
  );
}
