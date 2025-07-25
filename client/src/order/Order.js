import OrderCard from "./OrderCard"

export default function Order() {
    const cart = JSON.parse(localStorage.getItem('cart'))

    
    return (
        <>
        <div className="userData">

        </div>
        <div className="cart">
            {cart.map((item) => <OrderCard data={item} key={item.id}/>)}
        </div>
        </>
    )
}

