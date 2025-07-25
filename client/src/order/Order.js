import OrderCard from "./OrderCard";
import { useState } from "react";
import "./order.css";

export default function Order() {
  const [userData, setUserData] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const cart = JSON.parse(localStorage.getItem("cart"));

  async function submitOrder() {
    const orderedProducts = JSON.parse(localStorage.getItem("cart"));
    const bodyToSubmit = {
      name: userData.name,
      address: userData.address,
      phone: userData.phone,
      productId: orderedProducts,
    };


    await fetch(`http://localhost:3030/products/order/s`, {
      method: "POST",
      body: JSON.stringify(bodyToSubmit),
      headers: {
        "Content-type": "application/json",
      },
    });
  }

  return (
    <>
      <div className="userData">
        <form className="orderForm">
          <label> Name </label>
          <input
            required
            type="text"
            name="name"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />

          <label> Address </label>
          <input
            required
            type="text"
            name="address"
            value={userData.address}
            onChange={(e) =>
              setUserData({ ...userData, address: e.target.value })
            }
          />

          <label> Phone </label>
          <input
            required
            type="text"
            name="phone"
            value={userData.phone}
            onChange={(e) =>
              setUserData({ ...userData, phone: e.target.value })
            }
          />

          <button type="button" onClick={() => submitOrder()}>
            ORDER NOW
          </button>
        </form>
      </div>
      <div className="cart">
        {cart.map((item) => (
          <OrderCard data={item} key={item.id} />
        ))}
      </div>
    </>
  );
}
