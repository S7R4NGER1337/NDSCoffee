import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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
  const [productData, setProductData] = useState({});
  const productId = useLocation().pathname.split("/")[2];

  useEffect(() => {
    async function setData() {
      setProductData(await getProductData(productId));
    }
    setData();
  }, []);

  return (
    <>
      <h1>{productData.name}</h1>
    </>
  );
}
