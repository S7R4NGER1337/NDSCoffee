import { useEffect, useState } from "react";
import "./orderCard.css";


function methodsQty(productId, operation) {
  const cartInfo = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cartInfo.findIndex((item) => item.id === productId);

  if(operation === 'sub'){
    cartInfo[index].qty -= 1;
  }
  if(operation === 'sum'){
    cartInfo[index].qty += 1
  }
  
  if(cartInfo[index].qty <= 0){
    cartInfo.splice(cartInfo.indexOf(cartInfo[index]), 1)
  }
  localStorage.setItem("cart", JSON.stringify(cartInfo));
  return cartInfo;
}


export default function OrderCard({ data }) {
  const [product, setProduct] = useState([]);

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

  return (
    <div className="cardContainer">
      <img alt="cardImage" src={product.image} className="cardImage" />
      <div>
        <h1>{product.name}</h1>
        <p>{product.price * data.qty} лв</p>
        <p>{data.qty}</p>
        <button onClick={() => methodsQty(data.id, 'sub')}> - </button>
      </div>
    </div>
  );
}
