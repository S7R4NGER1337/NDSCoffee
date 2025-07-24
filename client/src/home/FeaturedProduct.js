import './featuredProduct.css'

export default function FeaturedProduct({productData}) {
    
    return (
        <div className="featuredProduct">
            <img alt="productImage" src={productData.image} className="featuredProductImg"/>
            <h1 className="featuredProductName">{productData.name}</h1>
            <button className="featuredProductBtn">View Product</button>
        </div>
    )
}