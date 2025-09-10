import { Link } from "react-router-dom";
import styles from "./catalogCard.module.css";
import { useState, useRef } from "react";
import Modal from "../../components/Modal";
import { setOrder } from "../../utils/order";

export default function CatalogCard({ productData }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);

  const openModal = () => setOpen(true);
  const closeModal = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  function addToCart() {
    setOrder(productData._id, 1);
    closeModal()
  }

  return (
    <>
      <div className={styles.catalogCardContainer}>
        <Link
          to={`/product/${productData._id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className={styles.imageWrap}>
            <img
              className={styles.catalogCardImage}
              alt="productImg"
              src={productData.image}
            />
            <span className={styles.fullDetails}>View Full Details</span>
          </div>
        </Link>
        <div className={styles.catalogCardInfo}>
          <h1 className={styles.catalogCardName}>{productData.name}</h1>
          <p className={styles.catalogCardPrice}>${productData.price}</p>
        </div>
        <div className={styles.catalogCardButtons}>
          <button onClick={() => addToCart()} className={`${styles.catalogCardButton} ${styles.addToCart}`}>
            Add to Cart
          </button>
          <button
            ref={triggerRef}
            onClick={openModal}
            className={styles.catalogCardButton}
          >
            Quick View
          </button>
        </div>
      </div>
      <Modal open={open} onClose={closeModal}>
        <div className={styles.quickViewContainer}>
          <p className={styles.closeBtn} onClick={() => closeModal()}>
            X
          </p>
          <img
            className={styles.quickViewImage}
            src={productData.image}
            alt="productImage"
          />
          <div className={styles.quickViewData}>
            <h1 className={styles.quickViewName}>{productData.name}</h1>
            <p className={styles.quickViewPrice}>${productData.price}</p>
            <p className={styles.quickViewDesc}>{productData.description}</p>
            <div className={styles.quickViewRoastContainer}>
              <p className={styles.quickViewRoastName}>Roast Level: </p>
              <p className={styles.quickViewRoastLevel}>
                {productData.roastLevel}
              </p>
            </div>
            <button className={styles.quickViewAddToCart} onClick={() => addToCart()}>Add to Cart</button>
            <Link
              to={`/product/${productData._id}`}
              className={styles.quickViewFull}
            >
              <p>View Full Details</p>
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
}
