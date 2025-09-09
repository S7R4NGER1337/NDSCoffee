import { Link } from "react-router-dom";
import styles from "./catalogCard.module.css";
import { useState, useRef } from "react";
import Modal from "../../components/Modal";

export default function CatalogCard({ productData }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);

  const openModal = () => setOpen(true);
  const closeModal = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

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
          <button className={`${styles.catalogCardButton} ${styles.addToCart}`}>
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
        <h2 className="text-xl font-semibold">Модален прозорец</h2>
        <p className="mt-2">
          Кликни извън модала или натисни Escape за да го затвориш.
        </p>

        <div className="mt-4 flex justify-end">
          <button onClick={closeModal} className="rounded-md border px-3 py-1">
            Затвори
          </button>
        </div>
      </Modal>
    </>
  );
}
