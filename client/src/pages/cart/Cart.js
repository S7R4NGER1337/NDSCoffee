import styles from "./cart.module.css";
import { getCartProducts } from "../../api/products";
import { useEffect, useState } from "react";

export default function Cart() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    async function name() {
      const products = await getCartProducts(cart);
      setCartProducts(products);
    }
    name();
  }, [cart]);

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.cartName}>Your Cart</h1>
      <div className={styles.cartDataContainer}>
        <div className={styles.cartInfoContainer}></div>
        <div className={styles.orderSummary}></div>
      </div>
      <div className={styles.alsoLike}></div>
    </div>
  );
}
