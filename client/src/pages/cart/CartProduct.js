import styles from './cartProduct.module.css'

export default function CartProduct({productData}) {
    return(
        <div className={styles.productContainer}>
            <img src={productData.image} alt='productImage' />
            <div className={styles.productDataContainer}>
                <div className={styles.productInfoContainer}>
                    <h1 className={styles.productInfoName}>{productData.name}</h1>
                    <p className={styles.productInfoPrice}>{productData.price}</p>
                </div>
                <div className={styles.productActions}>
                    <div className={styles.qtyEdit}>
                        <p className={styles.qtyAction}>-</p>
                        <p className={styles.qtyValue}>{productData.qty}</p>
                        <p className={styles.qtyAction}>+</p>
                    </div>
                    <button>Delete</button>
                </div>
            </div>
        </div>
    )
}