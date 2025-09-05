import { useEffect } from "react";
import styles from "./review.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import OrderCard from "./ProductCard";
import ReviewProduct from "./ReviewProduct";


export default function Review() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart"));

  useEffect(() => {
    if (state === null || cart === null) navigate("/");
  }, [state, cart, navigate]);


  async function submitOrder() {
    const orderedProducts = JSON.parse(localStorage.getItem("cart"));
    if (
      state.name === "" ||
      state.address === "" ||
      state.phone === "" ||
      orderedProducts === null
    )
      return;
    const bodyToSubmit = {
      name: state.name,
      address: state.address,
      phone: state.phone,
      productId: orderedProducts,
    };

    await fetch(`http://localhost:3030/products/order/s`, {
      method: "POST",
      body: JSON.stringify(bodyToSubmit),
      headers: {
        "Content-type": "application/json",
      },
    });

    localStorage.removeItem("cart");
    alert("Order successfull");
    navigate("/");
  }

  return (
    <div className={styles.reviewcontainer}>
      <h1>Review Your Order</h1>
      <div className={styles.cartContainer}>
        <h1>Items</h1>
        <div className={styles.itemsContainer}>
            {cart === null ? (
            <h1>There is nothing in the cart</h1>
          ) : (
            // cart.map((item) => <OrderCard data={item} key={item.id}/>)
            cart.map((item) => <ReviewProduct data={item} key={item.id}/>)
          )}
        </div>
      </div>
    </div>
  );
}
