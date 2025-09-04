import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./productPage.module.css";
import { setOrder } from "../App";
import { useNavigate } from "react-router";
import { getProductDataById } from "../api/products";

export default function ProductPage() {
  const navigate = useNavigate()
  const [productData, setProductData] = useState({});
  const productId = useLocation().pathname.split("/")[2];

  useEffect(() => {
    async function setData() {
      setProductData(await getProductDataById(productId));
    }
    setData();
  }, [productId]);

  return (
    <>
      <div className={styles.productContainer}>
        <img
          alt="productImage"
          src={productData.image}
          className={styles.productImage}
        />
        <div className={styles.productData}>
          <h1 className={styles.productName}>{productData.name}</h1>
          <p className={styles.productPrice}>{productData.price} лв</p>
          <p className={styles.productDescription}>{productData.description}</p>
          <button className={styles.productBuy} onClick={() => {
            setOrder(productId)
            navigate('/order')
            }}>Add to cart</button>
        </div>
      </div>
    </>
  );
}
