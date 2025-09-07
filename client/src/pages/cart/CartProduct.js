import styles from "./cartProduct.module.css";
import { useEffect, useState } from "react";
import { methodsQty } from "../../utils/cart";

export default function CartProduct({ productData }) {
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setQty(productData.qty);
    setPrice(productData.price * qty);
  }, [productData.price, productData.qty, qty]);

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
            <p
              onClick={() => methodsQty(productData._id, "sub", setQty)}
              className={styles.qtyAction}
            >
              -
            </p>
            <p className={styles.qtyValue}>{qty}</p>
            <p
              onClick={() => methodsQty(productData._id, "sum", setQty)}
              className={styles.qtyAction}
            >
              +
            </p>
          </div>
          <img
            onClick={() => methodsQty(productData._id, "del", setQty)}
            className={styles.trashIcon}
            src="/trash-solid-full-gray.svg"
            alt="trashIcon"
          />
        </div>
      </div>
    </div>
  );
}
