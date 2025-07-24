import './featuredProduct.css'

export default function FeaturedProduct({productData}) {
    
    return (
        <div className="featuredProduct">
            <img alt="productImage" src="logo192.png" className="featuredProductImg"/>
            <h1 className="featuredProductName">{productData.name}</h1>
            <button className="featuredProductBtn">View Product</button>
        </div>
    )
}