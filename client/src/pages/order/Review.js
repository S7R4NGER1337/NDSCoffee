import { useEffect } from "react";
import styles from "./review.module.css";
import { useLocation, useNavigate } from "react-router-dom";
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
        <h1>Items</h1>
        <div className={styles.itemsContainer}>
            {cart === null ? (
            <h1>There is nothing in the cart</h1>
          ) : (
            cart.map((item) => <ReviewProduct data={item} key={item.id}/>)
          )}
        </div>
      </div>
    </div>
  );
}
