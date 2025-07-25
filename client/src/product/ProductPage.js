import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Nav from "../components/nav";
import "./productPage.css";

async function getProductData(id) {
  

  try {
    const response = await fetch(`http://localhost:3030/products/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

export default function ProductPage() {
  const linkings = [
    {
      linkPath: '/',
      linkName: 'Home'
    },
    {
      linkPath: "/catalog",
      linkName: "Catalog",
    },
  ];

  const [productData, setProductData] = useState({});
  const productId = useLocation().pathname.split("/")[2];

  useEffect(() => {
    async function setData() {
      setProductData(await getProductData(productId));
    }
    setData();
  }, [productId]);

  return (
    <>
      <Nav navName="NDS" navLinks={linkings} />
      <div className="productContainer">
        <img
          alt="productImage"
          src={productData.image}
          className="productImage"
        />
        <div className="productData">
          <h1 className="productName">{productData.name}</h1>
          <p className="productDescription">{productData.description}</p>
          <p className="productPrice">{productData.price} лв</p>
          <button className="productBuy">Buy now</button>
        </div>
      </div>
    </>
  );
}
