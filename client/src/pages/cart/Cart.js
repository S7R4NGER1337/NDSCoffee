import styles from "./cart.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartProduct from "./CartProduct";
import { subtotalFetch, productFetch, emptyCart } from "../../utils/cart";

export default function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });
  const navigate = useNavigate();

  useEffect(() => {
    emptyCart(navigate, cart);
    productFetch(setCartProducts, cart);
    subtotalFetch(setTotal, cart);
  }, [cart, navigate]);

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.cartName}>Your Cart</h1>
      <div className={styles.cartDataContainer}>
        <div className={styles.cartInfoContainer}>
          {cartProducts.map((product) => (
            <CartProduct
              productData={product}
              qty={cart.qty}
              key={product._id}
              setCart={setCart}
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
          <button onClick={() => navigate('/order')} className={styles.orderButton}>Proceed to Checkout</button>
        </div>
      </div>
      <div className={styles.alsoLike}></div>
    </div>
  );
}
