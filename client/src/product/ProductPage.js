import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Nav from "../components/nav";
import styles from "./productPage.module.css";
import { setOrder } from "../App";
import { useNavigate } from "react-router";

async function getProductData(id) {
  try {
    const response = await fetch(`http://localhost:3030/products/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

export default function ProductPage() {
  const navigate = useNavigate()
  const linkings = [
    {
      linkPath: '/',
      linkName: 'Home'
    },
    {
      linkPath: "/catalog",
      linkName: "Catalog",
    },
  ];

  const [productData, setProductData] = useState({});
  const productId = useLocation().pathname.split("/")[2];

  useEffect(() => {
    async function setData() {
      setProductData(await getProductData(productId));
    }
    setData();
  }, [productId]);

  return (
    <>
      <Nav navName="NDS" navLinks={linkings} />
      <div className={styles.productContainer}>
        <img
          alt="productImage"
          src={productData.image}
          className={styles.productImage}
        />
        <div className={styles.productData}>
          <h1 className={styles.productName}>{productData.name}</h1>
          <p className={styles.productDescription}>{productData.description}</p>
          <p className={styles.productPrice}>{productData.price} лв</p>
          <button className={styles.productBuy} onClick={() => {
            setOrder(productId)
            navigate('/order')
            }}>Buy now</button>
        </div>
      </div>
    </>
  );
}
