import { useEffect, useState } from "react";
import CatalogCard from "./CatalogCard";
import styles from './catalog.module.css'
import Nav from "../components/nav";

export default function Catalog() {
  const [products, setProducts] = useState([]);
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

  useEffect(() => {
    async function getProducts() {
      const response = await fetch("http://localhost:3030/products/available");
      const data = await response.json();
      setProducts(data);
    }
    getProducts();
  }, []);

  return (
    <>
    <Nav navName="NDS" navLinks={linkings}/>
      <h1 className={styles.catalogHeading}>Catalog</h1>
      <div className={styles.catalogCards}>
        {products.map((product) => (
          <CatalogCard productData={product} key={product._id}/>
        ))}
      </div>
    </>
  );
}
