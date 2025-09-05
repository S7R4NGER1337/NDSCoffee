// import OrderCard from "./ProductCard";
import { useState } from "react";
import styles from "./shipping.module.css";
import { useNavigate } from "react-router-dom";

export default function Order() {
  const [userData, setUserData] = useState({
    fullName: "",
    streetAddres: "",
    city: "",
    postalCode: "",
    phone: "",
    paymentType: "",
  });
  const navigate = useNavigate();
  // const cart = JSON.parse(localStorage.getItem("cart"));

  // async function submitOrder() {
  //   const orderedProducts = JSON.parse(localStorage.getItem("cart"));
  //   if (
  //     userData.name === "" ||
  //     userData.address === "" ||
  //     userData.phone === "" ||
  //     orderedProducts === null
  //   )
  //     return;
  //   const bodyToSubmit = {
  //     name: userData.name,
  //     address: userData.address,
  //     phone: userData.phone,
  //     productId: orderedProducts,
  //   };

  //   await fetch(`http://localhost:3030/products/order/s`, {
  //     method: "POST",
  //     body: JSON.stringify(bodyToSubmit),
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //   });

  //   localStorage.removeItem("cart");
  //   alert("Order successfull");
  //   navigate("/");
  // }

  return (
    <>
      <div className={styles.orderContainer}>
        <div className={styles.userData}>
          <h1>Shipping Information</h1>
          <form className={styles.orderForm}>
            <div className={styles.orderFormGroup}>
              <label> Full Name </label>
              <input
                placeholder="Enter your full name"
                className={styles.orderFormInput}
                required
                type="text"
                name="fullName"
                value={userData.fullName}
                onChange={(e) =>
                  setUserData({ ...userData, fullName: e.target.value })
                }
              />
            </div>

            <div className={styles.orderFormGroup}>
              <label> Street Addres </label>
              <input
                placeholder="Enter your street address"
                className={styles.orderFormInput}
                required
                type="text"
                name="streetAddres"
                value={userData.streetAddres}
                onChange={(e) =>
                  setUserData({ ...userData, streetAddres: e.target.value })
                }
              />
            </div>
            <div className={styles.orderFormGroup}>
              <label> City </label>
              <input
                placeholder="Enter your city"
                className={styles.orderFormInput}
                required
                type="text"
                name="city"
                value={userData.city}
                onChange={(e) =>
                  setUserData({ ...userData, city: e.target.value })
                }
              />
            </div>
            <div className={styles.orderFormGroup}>
              <label> Phone </label>
              <input
                placeholder="Enter your phone number"
                className={styles.orderFormInput}
                required
                type="number"
                name="phone"
                value={userData.phone}
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
              />
            </div>
            <div className={styles.orderFormGroup}>
              <label> Postal Code </label>
              <input
                placeholder="Enter your postal code"
                className={styles.orderFormInput}
                required
                type="number"
                name="phone"
                value={userData.postalCode}
                onChange={(e) =>
                  setUserData({ ...userData, postalCode: e.target.value })
                }
              />
            </div>
            <div className={styles.orderFormGroup}>
              <label> Payment Type </label>
              <select
                className={styles.orderFormInput}
                name="paymentType"
                value={userData.paymentType}
                onChange={(e) =>
                  setUserData({ ...userData, paymentType: e.target.value })
                }
              >
                <option value="" disabled hidden>
                  Choose Payment Type
                </option>
                <option value="cash">Cash on Delivery</option>
                <option value="card">Credit/Debit Card</option>
              </select>
            </div>
            <div className={styles.inputButtons}>
              <button
                className={styles.inputButton}
                type="button"
                onClick={() => navigate("/cart")}
              >
                Back to Cart
              </button>
              <button
                className={`${styles.inputButton} ${styles.inputContinue}`}
                type="button"
              >
                Continue to Payment
              </button>
            </div>
          </form>
        </div>
        {/* <div className={styles.cart}>
          {cart === null ? (
            <h1>There is nothing in the cart</h1>
          ) : (
            cart.map((item) => <OrderCard data={item} key={item.id} />)
          )}
        </div> */}
      </div>
    </>
  );
}
