import styles from "./reviewProduct.module.css";
import { getProductDataById } from "../../api/products";
import { useEffect, useState } from "react";
import { ProductImage } from "../../utils/imageHelper";

export default function ReviewProduct({ data }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProduct() {
      const productData = await getProductDataById(data.id);
      setProducts(productData);
    }
    getProduct();
  }, [data]);

  return (
    <div className={styles.productContainer}>
      <ProductImage base64Data={products.image} />
      <h1 className={styles.productName}>{products.name}</h1>
      <p>$ {products.price}</p>
    </div>
  );
}
