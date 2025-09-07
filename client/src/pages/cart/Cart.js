import styles from './cart.module.css'

export default function Cart() {
  const cart = JSON.parse(localStorage.getItem("cart"));

  console.log(cart);
  
    return(
        <div className={styles.cartContainer}>
            <h1 className={styles.cartName}>Your Cart</h1>
            <div className={styles.cartDataContainer}>
                <div className={styles.cartInfoContainer}>

                </div>
                <div className={styles.orderSummary}>

                </div>
            </div>
            <div className={styles.alsoLike}>

            </div>
        </div>
    )
}