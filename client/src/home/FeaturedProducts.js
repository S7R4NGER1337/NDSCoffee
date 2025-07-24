import { Link } from "react-router-dom";
import FeaturedProduct from "./FeaturedProduct";
import "./featuredProducts.css";
import { useEffect, useState } from "react";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch("http://localhost:3030/products/featured");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    }
    getProducts();
  }, []);

  return (
    <div style={{ margin: "2em" }}>
      <h1 className="featuredProductsHeading">Featured Products</h1>
      <div className="featuredProducts">
        {products.map((product) => (
          <Link
            to={`/products/${product._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <FeaturedProduct productData={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}
