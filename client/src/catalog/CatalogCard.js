import { Link } from "react-router-dom";
import "./catalogCard.css";

export default function CatalogCard({ productData }) {
  return (
    <Link
      to={`/product/${productData._id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="catalogCardContainer">
        <img
          className="catalogCardImage"
          alt="productImg"
          src={productData.image}
        />
        <h1 className="catalogCardname">{productData.name}</h1>
        <p className="catalogCardPrice">{productData.price} лв</p>
        <button className="catalogCardButton">More Info</button>
      </div>
    </Link>
  );
}
