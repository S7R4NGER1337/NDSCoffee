import styles from './featuredProduct.module.css'

export default function FeaturedProduct({productData}) {
    
    return (
        <div className={styles.featuredProduct}>
            <div className={styles.imageWrap}>
                <img alt="productImage" src={productData.image} className={styles.featuredProductImg}/>
                <span className={styles.viewMore}>View more</span>
            </div>
            <h1 className={styles.featuredProductName}>{productData.name}</h1>
            <p className={styles.featuredProductPrice}>${productData.price}</p>
        </div>
    )
}