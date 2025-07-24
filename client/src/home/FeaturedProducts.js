import { Link } from "react-router-dom";
import FeaturedProduct from "./FeaturedProduct";
import "./featuredProducts.css";

export default function FeaturedProducts() {
  const testProducts = [
    {
      name: "test1",
      id: "id1",
      imageUrl: "logo192.png",
    },
    {
      name: "test2",
      id: "id2",
      imageUrl: "logo192.png",
    },
    {
      name: "test2",
      id: "id2",
      imageUrl: "logo192.png",
    },
  ];

  return (
    <div style={{ margin: "2em" }}>
      <h1 className="featuredProductsHeading">FeaturedProducts</h1>
      <div className="featuredProducts">
        {testProducts.map((product) => (
          <Link to={`/products/${product._id}`} style={{textDecoration: 'none', color: 'inherit'}}>
            <FeaturedProduct productData={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}
