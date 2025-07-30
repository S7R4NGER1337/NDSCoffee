import styles from './featuredProduct.module.css'

export default function FeaturedProduct({productData}) {
    
    return (
        <div className={styles.featuredProduct}>
            <img alt="productImage" src={productData.image} className={styles.featuredProductImg}/>
            <h1 className={styles.featuredProductName}>{productData.name}</h1>
            <button className={styles.featuredProductBtn}>View Product</button>
        </div>
    )
}