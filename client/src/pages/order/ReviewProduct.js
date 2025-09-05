import styles from "./reviewProduct.module.css";
import { getProductDataById } from "../../api/products";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ReviewProduct({ data }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProduct() {
      const productData = await getProductDataById(data.id);
      setProducts({ ...productData, price: productData.price * data.qty });
    }
    getProduct();
  }, [data]);

  return (
    <Link to={`/product/${data.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
      <div className={styles.productContainer}>
        <img src={products.image} alt="productImage" className={styles.productImage}/>
        <h1 className={styles.productName}>
          {products.name} x{data.qty}
        </h1>
        <p>$ {products.price}</p>
      </div>
    </Link>
  );
}
