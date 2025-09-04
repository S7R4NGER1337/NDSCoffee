import styles from "./aboutUs.module.css";

export default function AboutUs() {
  return (
    <div className={styles.aboutUsSection}>
      <div className={styles.aboutUsInfo}>
        <h1 className={styles.aboutUsHeader}>
          Our Story: A Passion for Perfection
        </h1>
        <p className={styles.aboutUsText}>
          Bean & Brew was born from a simple yet profound love for coffee. We
          believe a perfect cup of coffee is more than just a morning ritual;
          it's an experience. Our journey began with a quest to find the world's
          most exceptional coffee beans, leading us to build relationships with
          dedicated farmers who share our commitment to quality and
          sustainability. 
        </p>
        <p className={styles.aboutUsText}>
          Our mission is to bring you the finest,
          ethically-sourced beans, roasted to perfection. We are passionate
          about preserving the unique flavors of each origin, ensuring that
          every cup you brew is a true reflection of its terroir. From the farm
          to your cup, we are dedicated to a process that respects both people
          and the planet.
        </p>
      </div>
      <img alt="aboutUs" src="coffeeFarmer.png" className={styles.aboutUsImg} />
    </div>
  );
}
