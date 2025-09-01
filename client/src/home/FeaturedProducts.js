import { Link } from "react-router-dom";
import FeaturedProduct from "./FeaturedProduct";
import styles from "./featuredProducts.module.css";
import { useEffect, useState } from "react";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch("http://localhost:3030/products/featured");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    }
    getProducts();
  }, []);

  return (
    <div className={styles.featuredProductsContainer}>
      <h1 className={styles.featuredProductsHeading}>Featured Coffee Beans</h1>
      <div className={styles.featuredProducts}>
        {products.length > 0 ? products.map((product) => (
          <Link
            to={`/product/${product._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
            key={product._id}
          >
            <FeaturedProduct productData={product}/>
          </Link>
        )): <h1>There are no active products</h1>}
      </div>
    </div>
  );
}
