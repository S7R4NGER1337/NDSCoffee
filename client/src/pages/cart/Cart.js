import styles from "./cart.module.css";
import { getProductDataById } from "../../api/products";
import { useEffect, useState } from "react";
import CartProduct from "./CartProduct";

export default function Cart() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    async function productFetch() {
      if (cart.length === 0) {
        setCartProducts([]);
        return;
      }
      try {
        const products = await Promise.all(
          cart.map((product) => getProductDataById(product.id))
        );

        const productsWithQty = products.map((product, index) => ({
          ...product,
          qty: cart[index].qty,
        }));

        setCartProducts(productsWithQty);
      } catch (err) {
        console.error(err);
      }
    }

    productFetch();
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
              <p className={styles.orderInfoPrice}>$40</p>
            </div>
            <div className={styles.orderInfo}>
              <p className={styles.orderInfoName}>Shipping</p>
              <p className={styles.orderInfoPrice}>$5</p>
            </div>
          </div>
          <div className={styles.line}></div>
          <div className={styles.orderTotal}>
            <h1 className={styles.orderTotalName}>Total</h1>
            <p className={styles.orderTotalPrice}>$45</p>
          </div>
          <div className={styles.line}></div>
          <button className={styles.orderButton}>Proceed to Checkout</button>
        </div>
      </div>
      <div className={styles.alsoLike}></div>
    </div>
  );
}
