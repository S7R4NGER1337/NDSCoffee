import OrderCard from "./OrderCard";
import { useState } from "react";
import styles from "./order.module.css";
import Nav from '../../components/nav'
import { useNavigate } from "react-router-dom";

export default function Order() {
  const [userData, setUserData] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const navigate = useNavigate()
  const cart = JSON.parse(localStorage.getItem("cart"));

  const linkings = [
        {
            linkPath: '/',
            linkName: 'Home'
        },
        {
            linkPath: '/catalog',
            linkName: 'Catalog'
        }
    ]

  async function submitOrder() {
    const orderedProducts = JSON.parse(localStorage.getItem("cart"));
    if(userData.name === '' || userData.address === '' || userData.phone === '' || orderedProducts === null) return
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

    localStorage.removeItem('cart')
    alert('Order successfull')
    navigate('/')
  }

  return (
    <>
    <Nav navName="NDS" navLinks={linkings}/>
    <div className={styles.orderContainer}>
      <div className={styles.userData}>
        <form className={styles.orderForm}>
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
      <div className={styles.cart}>
        {cart === null ? <h1>There is nothing in the cart</h1>:
        cart.map((item) => (
          <OrderCard data={item} key={item.id} />
        ))
      }
      </div>
    </div>
      </>
  );
}
