import styles from "./cart.module.css";
import { getProductDataById } from "../../api/products";
import { subtotalFetch, productFetch } from '../../utils/cart'
import { useEffect, useState } from "react";
import CartProduct from "./CartProduct";

export default function Cart() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const [cartProducts, setCartProducts] = useState([]);
  const [total, setTotal] = useState(0)

  useEffect(() => {
    subtotalFetch(setTotal, cart)
    productFetch(setCartProducts, cart);
  }, [cart]);

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.cartName}>Your Cart</h1>
      <div className={styles.cartDataContainer}>
        <div className={styles.cartInfoContainer}>
          {cartProducts.map((product) => (
            <CartProduct
              productData={product}
              qty={cart.qty}
              key={product.id}
            />
          ))}
        </div>
        <div className={styles.orderSummary}>
          <h1 className={styles.orderSummaryName}>Order Summary</h1>
          <div className={styles.orderDetails}>
            <div className={styles.orderInfo}>
              <p className={styles.orderInfoName}>Subtotal</p>
              <p className={styles.orderInfoPrice}>${total}</p>
            </div>
            <div className={styles.orderInfo}>
              <p className={styles.orderInfoName}>Shipping</p>
              <p className={styles.orderInfoPrice}>$5</p>
            </div>
          </div>
          <div className={styles.line}></div>
          <div className={styles.orderTotal}>
            <h1 className={styles.orderTotalName}>Total</h1>
            <p className={styles.orderTotalPrice}>${total + 5}</p>
          </div>
          <div className={styles.line}></div>
          <button className={styles.orderButton}>Proceed to Checkout</button>
        </div>
      </div>
      <div className={styles.alsoLike}></div>
    </div>
  );
}
