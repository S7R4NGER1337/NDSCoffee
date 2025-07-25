import { useEffect, useState } from "react";
import CatalogCard from "./CatalogCard";
import './catalog.css'

export default function Catalog() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const response = await fetch("http://localhost:3030/products/available");
      const data = await response.json();
      setProducts(data);
    }
    getProducts();
  }, []);

  return (
    <div className="catalogContainer">
      <h1>Catalog</h1>
      <div className="catalogCards">
        {products.map((product) => (
          <CatalogCard productData={product} key={product._id} />
        ))}
      </div>
    </div>
  );
}
