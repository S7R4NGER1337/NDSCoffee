import { useEffect } from "react";
import styles from "./review.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReviewProduct from "./ReviewProduct";

export default function Review() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart"));

  useEffect(() => {
    if (state === null || cart === null) navigate("/");
  }, [state, cart, navigate]);

  return (
    <div className={styles.reviewcontainer}>
      <h1>Review Your Order</h1>
      <div className={styles.cartContainer}>
        <h1 className={styles.cartContainerName}>Items</h1>
        <div className={styles.itemsContainer}>
          {cart === null ? (
            <h1>There is nothing in the cart</h1>
          ) : (
            cart.map((item) => <ReviewProduct data={item} key={item.id} />)
          )}
          <Link to="/cart" style={{textDecoration: 'none', color: 'rgba(255, 140, 58, 1)', alignSelf: 'end'}}>
            <p>Edit Your Items</p>
          </Link>
        </div>
      </div>
      <div className={styles.clientContainer}>
          <div className={styles.clientDataContainer}>
            <h1 className={styles.clientDataName}>Shipping Data</h1>
            <div className={styles.clientData}>
              <p>{state.fullName}</p>
              <p>{state.phone}</p>
              <p>{state.city}</p>
              <p>{state.postalCode}</p>
              <p>{state.streetAddres}</p>
            </div>
          </div>
          <div className={styles.clientDataContainer}>
            <h1 className={styles.clientDataName}>Payment Method</h1>
            <p>{state.paymentType}</p>
          </div>
      </div>
    </div>
  );
}
