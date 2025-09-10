import { useEffect, useState } from "react";
import styles from "./orderCard.module.css";
import { subtotalFetch } from "../../utils/cart";
import { changeOrderStatus } from "../../api/orders";
import { productFetch } from "../../utils/cart";
import Modal from "../../components/Modal";
import { Link } from "react-router-dom";

export default function OrderCard({ product, deleteProduct }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [productData, setProductData] = useState(product);
  const [open, setOpen] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    productFetch(setCartProducts, product.cart);
    subtotalFetch(setTotalPrice, product.cart);
  }, [product]);

  const Status = () => {
    let statusColor = {
      backgroundColor: "",
      color: "rgba(133, 77, 14, 1)",
    };

    if (productData.status === "Pending") {
      statusColor.backgroundColor = "rgba(254, 252, 232, 1)";
      statusColor.color = "rgba(133, 77, 14, 1)";
    }
    if (productData.status === "Delivered") {
      statusColor.backgroundColor = "rgba(220, 252, 231, 1)";
      statusColor.color = "rgba(22, 101, 52, 1)";
    }
    if (productData.status === "Processing") {
      statusColor.backgroundColor = "rgba(237, 233, 254, 1)";
      statusColor.color = "rgba(91, 33, 182, 1)";
    }
    if (productData.status === "Canceled") {
      statusColor.backgroundColor = "rgba(254, 226, 226, 1)";
      statusColor.color = "rgba(153, 27, 27, 1)";
    }
    if (productData.status === "Shipped") {
      statusColor.backgroundColor = "rgba(224, 242, 254, 1)";
      statusColor.color = "rgba(12, 74, 110, 1)";
    }

    return (
      <p
        onClick={() => changeStatus()}
        className={styles.status}
        style={statusColor}
      >
        {productData.status}
      </p>
    );
  };

  const openModal = () => setOpen(true);
  const closeModal = () => {
    setOpen(false);
  };

  function changeStatus() {
    let newStatus = "";
    if (productData.status === "Pending") {
      newStatus = "Processing";
    }
    if (productData.status === "Processing") {
      newStatus = "Shipped";
    }
    if (productData.status === "Shipped") {
      newStatus = "Delivered";
    }
    if (productData.status === "Delivered") {
      newStatus = "Delivered";
    }

    changeOrderStatus(productData._id, newStatus);
    setProductData({ ...productData, status: newStatus });
  }

  return (
    <>
      <tr className={styles.tableBodyWrap} key={productData._id}>
        <td className={`${styles.tableBody} ${styles.tableBodyDarker}`}>
          {productData._id}
        </td>
        <td className={styles.tableBody}>{productData.fullName}</td>
        <td className={styles.tableBody}>15.11.24</td>
        <td className={styles.tableBody}>${totalPrice}</td>
        <td className={styles.tableBody}>
          <Status />
        </td>
        <td className={`${styles.tableBody} ${styles.tableActions}`}>
          <p
            onClick={() => openModal()}
            style={{
              color: "rgba(255, 140, 58, 1)",
              fontSize: "1.1rem",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Details
          </p>
        </td>
      </tr>
      {cartProducts.length > 0 && (
        <Modal open={open} onClose={closeModal}>
          <div className={styles.detailsContainer}>
            <div className={styles.detailsImageContainer}>
              {cartProducts.map((product, index) => (
                <Link to={`/product/${product._id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                  <img
                    className={styles.detailsImage}
                    src={product.image}
                    alt="productImage"
                  />
                  <p>x{productData.cart[index].qty}</p>
                </Link>
              ))}
            </div>
            <div className={styles.detailsClientDataContainer}>
              <div className={styles.detailsClientData}>
                <p className={styles.detailsClientDataName}>Name: </p>
                <p className={styles.detailsClientDataText}>{productData.fullName}</p>
              </div>
              <div className={styles.detailsClientData}>
                <p className={styles.detailsClientDataName}>City: </p>
                <p className={styles.detailsClientDataText}>{productData.city}</p>
              </div>
              <div className={styles.detailsClientData}>
                <p className={styles.detailsClientDataName}>Phone: </p>
                <p className={styles.detailsClientDataText}>{productData.phone}</p>
              </div>
              <div className={styles.detailsClientData}>
                <p className={styles.detailsClientDataName}>Adress: </p>
                <p className={styles.detailsClientDataText}>{productData.streetAddres}</p>
              </div>
              <div className={styles.detailsClientData}>
                <p className={styles.detailsClientDataName}>Postal Code: </p>
                <p className={styles.detailsClientDataText}>{productData.postalCode}</p>
              </div>
              <div className={styles.detailsClientData}>
                <p className={styles.detailsClientDataName}>Payment Method: </p>
                <p className={styles.detailsClientDataText}>{productData.paymentType}</p>
              </div>
            </div>
          </div>
          <p className={styles.deleteOrder} onClick={() => deleteProduct(productData._id)}>Delete Order</p>
        </Modal>
      )}
    </>
  );
}
