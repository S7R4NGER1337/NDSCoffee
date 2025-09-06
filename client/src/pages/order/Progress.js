import styles from "./progress.module.css";

export default function Progress({page}) {

  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressStep}>
        <p className={page === 1 ? styles.progressStepNumberSelect : styles.progressStepNumber}>1</p>
        <p className={page === 1 ? styles.progressStepNameSelect : styles.progressStepName}>Shipping</p>
      </div>
      <div className={styles.progressLine}></div>
      <div className={styles.progressStep}>
        <p className={page === 2 ? styles.progressStepNumberSelect : styles.progressStepNumber}>2</p>
        <p className={page === 2 ? styles.progressStepNameSelect : styles.progressStepName}>Payment</p>
      </div>
      <div className={styles.progressLine}></div>
      <div className={styles.progressStep}>
        <p className={page === 3 ? styles.progressStepNumberSelect : styles.progressStepNumber}>3</p>
        <p className={page === 3 ? styles.progressStepNameSelect : styles.progressStepName}>Review</p>
      </div>
    </div>
  );
}
