import { useEffect, useState } from "react";
import "./orderCard.css";

export default function OrderCard({ data }) {
  const [product, setProduct] = useState([]);
  const [qty, setQty] = useState(0)

  function methodsQty(productId, operation) {
    const cartInfo = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cartInfo.findIndex((item) => item.id === productId);

    if (operation === "sub") {
      cartInfo[index].qty -= 1;
      setQty(cartInfo[index].qty)
    }
    if (operation === "sum") {
      cartInfo[index].qty += 1;
      setQty(cartInfo[index].qty)
    }

    if (qty-1 < 1) {
      cartInfo.splice(cartInfo.indexOf(cartInfo[index]), 1);
    }
    localStorage.setItem("cart", JSON.stringify(cartInfo));
    return cartInfo;
  }

  useEffect(() => {
    async function getProduct() {
      try {
        const response = await fetch(
          `http://localhost:3030/products/${data.id}`
        );
        const product = await response.json();

        setProduct(product);
        return product;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    getProduct();
  }, []);

  useEffect(() =>{
    setQty(data.qty)
  },[data.qty])

  return (
    <div className="cardContainer">
      <img alt="cardImage" src={product.image} className="cardImage" />
      <div>
        <h1>{product.name}</h1>
        <p>{product.price * data.qty} лв</p>
        <p>{qty}</p>
        <button onClick={() => methodsQty(data.id, "sub")}> - </button>
        <button onClick={() => methodsQty(data.id, "sum")}> + </button>
      </div>
    </div>
  );
}
