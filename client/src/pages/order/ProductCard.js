import { useEffect, useState } from "react";
import styles from "./productCard.module.css";

export default function OrderCard({ data }) {
  const [product, setProduct] = useState([]);
  const [qty, setQty] = useState(0)
  const [price, setPrice] = useState(0)

  function methodsQty(productId, operation) {
    const cartInfo = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cartInfo.findIndex((item) => item.id === productId);

    if (operation === "sub") {
      cartInfo[index].qty -= 1;

      setPrice(cartInfo[index].qty * product.price)
      setQty(cartInfo[index].qty)
    }
    if (operation === "sum") {
      cartInfo[index].qty += 1;

      setPrice(cartInfo[index].qty * product.price)
      setQty(cartInfo[index].qty)
    }

    if (qty < 1) {
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
  }, [data.id]);

  useEffect(() =>{    
    setPrice(data.qty * product.price)
    setQty(data.qty)
  },[data.qty, product])

  return (
    <div className={styles.cardContainer}>
      <img alt="cardImage" src={product.image} className={styles.cardImage} />
      <div>
        <h1>{product.name}</h1>
        <p>{price} лв</p>
        <p>{qty}</p>
        <button onClick={() => methodsQty(data.id, "sub")}> - </button>
        <button onClick={() => methodsQty(data.id, "sum")}> + </button>
      </div>
    </div>
  );
}
