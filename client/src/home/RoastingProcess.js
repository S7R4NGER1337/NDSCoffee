import styles from './roastingProcess.module.css'

export default function RoastingProcess() {
    return(
        <div className={styles.roastingProcessContainer}>
            <div className={styles.processStep}>
                <img src="/fire-solid-full.svg" alt='processStep' />
                <h1 className={styles.processName}>First Crack</h1>
                <p className={styles.processDesc}>We carefully listen for the 'first crack', a key indicator that the beans are beginning to develop their unique flavor profile.</p>
            </div>
            <div className={styles.processStep}>
                <img src="/hourglass-start-solid-full.svg" alt='processStep' />
                <h1 className={styles.processName}>Development Time</h1>
                <p className={styles.processDesc}>The time between the first and second crack is crucial. We meticulously control this phase to achieve the perfect balance of acidity and sweetness.</p>
            </div>
            <div className={styles.processStep}>
                <img src="/snowflake-regular-full.svg" alt='processStep' />
                <h1 className={styles.processName}>Cooling Down</h1>
                <p className={styles.processDesc}>Once the optimal roast is achieved, we rapidly cool the beans to lock in the flavors and halt the roasting process, ensuring a consistent taste.</p>
            </div>
        </div>
    )
}