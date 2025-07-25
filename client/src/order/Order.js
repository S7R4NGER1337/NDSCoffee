import OrderCard from "./OrderCard"
import { useState } from "react"
import './order.css'

export default function Order() {
    const [userData, setUserData] = useState({
        name: '',
        address: '',
        phone: ''
    })
    const cart = JSON.parse(localStorage.getItem('cart'))

    function submitOrder(params) {
        console.log(userData);
        
    }
    return (
        <>
        <div className="userData">
            <form className="orderForm">

                <label> Name </label>
                <input required type="text" name="name" value={userData.name} onChange={(e) => setUserData({...userData, name: e.target.value})}/>

                <label> Address </label>
                <input required type="text" name="address" value={userData.address} onChange={(e) => setUserData({...userData, address: e.target.value})}/>

                <label> Phone </label>
                <input required type="text" name="phone" value={userData.phone} onChange={(e) => setUserData({...userData, phone: e.target.value})}/>

                <button type="button" onClick={() => submitOrder()}>ORDER NOW</button>
            </form>
        </div>
        <div className="cart">
            {cart.map((item) => <OrderCard data={item} key={item.id}/>)}
        </div>
        </>
    )
}

