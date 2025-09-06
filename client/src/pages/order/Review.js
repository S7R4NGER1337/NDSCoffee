import { useEffect, useState } from "react";
import styles from "./review.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReviewProduct from "./ReviewProduct";
import { getProductPrices } from "../../api/products";
import Progress from "./Progress";

export default function Review() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart"));
  const [sumOfProducts, setSumOfProducts] = useState(0);

  useEffect(() => {
    if (state === null || cart === null) navigate("/");

    async function fetchProductPrices() {
      const price = await getProductPrices(cart);
      setSumOfProducts(price.sum);
    }
    fetchProductPrices();
  }, [state, cart, navigate]);

  async function placeOrder() {
    await fetch(`http://localhost:3030/products/order/s`, {
      method: "POST",
      body: JSON.stringify({ ...state, cart, status: "pending" }),
      headers: {
        "Content-type": "application/json",
      },
    });

    localStorage.removeItem("cart");
    alert("Order successfull");
    navigate("/");
  }

  return (
    <>
      <Progress page={3} />
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
            <Link
              to="/cart"
              style={{
                textDecoration: "none",
                color: "rgba(255, 140, 58, 1)",
                alignSelf: "end",
              }}
            >
              <p>Edit Your Items</p>
            </Link>
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.clientContainer}>
          <div className={styles.clientInfo}>
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
              <div className={styles.paymentData}>
                <p>
                  {state.paymentType === "cash"
                    ? "Cash on Delivery"
                    : "Paid by card"}
                </p>
                <img
                  className={styles.paymentIcon}
                  src={
                    state.paymentType === "cash"
                      ? "truck-solid-full.svg"
                      : "credit-card-solid-full.svg"
                  }
                  alt="paymentIcon"
                />
              </div>
            </div>
          </div>
          <p onClick={() => navigate('/order', {state: state})} className={styles.editShoppingData}>Edit Shipping Data</p>
        </div>
        <div className={styles.line}></div>
        <div className={styles.orderSummaryContainer}>
          <h1 className={styles.orderSummaryName}>Order Summary</h1>
          <div className={styles.orderSummaryItems}>
            <div className={styles.orderSummaryItem}>
              <p className={styles.orderSummaryItemName}>Subtotal</p>
              <p className={styles.orderSummaryItemPrice}>$ {sumOfProducts}</p>
            </div>
            <div className={styles.orderSummaryItem}>
              <p className={styles.orderSummaryItemName}>Shipping</p>
              <p className={styles.orderSummaryItemPrice}>$ 5</p>
            </div>
          </div>
          <div className={styles.orderSummaryTotal}>
            <h1 className={styles.orderSummaryTotalName}>Total</h1>
            <p className={styles.orderSummaryTotalPrice}>$ {sumOfProducts}</p>
          </div>
        </div>
        <button className={styles.placeOrder} onClick={() => placeOrder()}>
          Place Order
        </button>
      </div>
    </>
  );
}
