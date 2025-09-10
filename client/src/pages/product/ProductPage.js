import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./productPage.module.css";
import { setOrder } from "../../utils/order";
import { useNavigate } from "react-router";
import { getProductDataById } from "../../api/products";
import { showPopUp } from "../../components/PopUp";

export default function ProductPage() {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({});
  const [qty, setQty] = useState(1);
  const productId = useLocation().pathname.split("/")[2];
  const [qtyStatus, setQtyStatus] = useState(true);

  useEffect(() => {
    async function setData() {
      setProductData(await getProductDataById(productId));
    }
    setData();
  }, [productId]);

  function valueOnChange(e) {
    const newQty = Number(e.target.value);
    setQty(newQty);

    if (newQty >= productData.qty || newQty <= 0) {
      setQtyStatus(false);
      return;
    }
    setQtyStatus(true);
  }

  function addToCart() {
    if(!qtyStatus){
      return
    }
    
    setOrder(productId, qty);
    showPopUp("Product successfully added to the cart.")
    navigate("/cart");
  }

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
          <div className={styles.productInfo}>
            <p className={styles.productDescription}>
              {productData.description}
            </p>
            <div className={styles.productpriceContainer}>
              <p className={styles.productPriceName}>Price</p>
              <p className={styles.productPrice}>${productData.price}</p>
            </div>
            <div className={styles.buttonsContainer}>
              <div className={styles.qtyContainer}>
                <label className={styles.qtyName}>Quantity</label>
                {!qtyStatus && (
                  <p
                    style={{
                      textAlign: "start",
                      padding: "0.5em 0em",
                      color: "red",
                    }}
                  >
                    Not enough products
                  </p>
                )}
                <input
                  className={styles.qty}
                  type="number"
                  value={qty}
                  onChange={(e) => valueOnChange(e)}
                />
              </div>
              <button className={styles.productBuy} onClick={() => addToCart()}>
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
