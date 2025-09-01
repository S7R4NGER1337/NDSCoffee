import styles from './roastingProcess.module.css'

export default function RoastingProcess() {
    return(
        <div className={styles.roastingProcessContainer}>
            <div className={styles.processStep}>
                <img src="" alt='processStep' />
                <h1 className={styles.processName}></h1>
                <p className={styles.processDesc}></p>
            </div>
            <div className={styles.processStep}>
                <img src="" alt='processStep' />
                <h1 className={styles.processName}></h1>
                <p className={styles.processDesc}></p>
            </div>
            <div className={styles.processStep}>
                <img src="" alt='processStep' />
                <h1 className={styles.processName}></h1>
                <p className={styles.processDesc}></p>
            </div>
        </div>
    )
}