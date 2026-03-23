import styles from "./cartProduct.module.css";
import { useState, useEffect } from "react";
import { methodsQty } from "../../utils/cart";

export default function CartProduct({ productData, setCart }) {
  const [qty, setQty] = useState(productData.qty);

  useEffect(() => {
    setQty(productData.qty);
  }, [productData.qty]);

  const price = (productData.price * qty).toFixed(2);

  return (
    <div className={styles.productContainer}>
      <img
        className={styles.productImage}
        src={productData.image}
        alt="productImage"
      />
      <div className={styles.productDataContainer}>
        <div className={styles.productInfoContainer}>
          <h1 className={styles.productInfoName}>{productData.name}</h1>
          <p className={styles.productInfoPrice}>${price}</p>
        </div>
        <div className={styles.productActions}>
          <div className={styles.qtyEdit}>
            <button
              onClick={() => methodsQty(productData._id, "sub", setQty, setCart)}
              className={styles.qtyAction}
            >
              −
            </button>
            <p className={styles.qtyValue}>{qty}</p>
            <button
              onClick={() => methodsQty(productData._id, "sum", setQty, setCart)}
              className={styles.qtyAction}
            >
              +
            </button>
          </div>
          <img
            onClick={() => methodsQty(productData._id, "del", setQty, setCart)}
            className={styles.trashIcon}
            src="/trash-solid-full-gray.svg"
            alt="Remove item"
            title="Remove item"
          />
        </div>
      </div>
    </div>
  );
}
