import { useEffect, useState } from "react";
import CatalogCard from "./CatalogCard";
import styles from "./catalog.module.css";

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    roastedLevel: "",
    origin: "",
  });

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
      <h1 className={styles.catalogHeading}>All Coffee Beans</h1>
      <p className={styles.catalogText}>
        Explore our curated collection of the finest coffee beans from around
        the world.
      </p>
      <div className={styles.filtersContainer}>
        <div className={styles.filters}>
          <select
            name="RoastLevel"
            value={filters.roastedLevel}
            onChange={(e) =>
              setFilters({ ...filters, roastedLevel: e.target.value })
            }
          >
            <option value="" disabled hidden>
              Roasted Level
            </option>
            <option value="Light">Light</option>
            <option value="Medium">Medium</option>
            <option value="MediumDark">Medium-Dark</option>
            <option value="Dark">Dark</option>
          </select>
          <select
            name="Origin"
            value={filters.origin}
            onChange={(e) => setFilters({ ...filters, origin: e.target.value })}
          >
            <option value="" disabled hidden>
              Origin
            </option>
            <option value="Colombia">Colombia</option>
            <option value="Ethiopia">Ethiopia</option>
            <option value="Brazil">Brazil</option>
            <option value="Guatemala">Guatemala</option>
            <option value="Kenya">Kenya</option>
            <option value="CostaRica">Costa Rica</option>
            <option value="Indonesia">Indonesia</option>
            <option value="India">India</option>
            <option value="Honduras">Honduras</option>
            <option value="Panama">Honduras</option>
          </select>
        </div>
        <div className={styles.sort}>
          <select
            name="RoastLevel"
            value={filters.roastedLevel}
            onChange={(e) =>
              setFilters({ ...filters, roastedLevel: e.target.value })
            }
          >
            <option value="Featured">Featured</option>
            <option value="PriceL">Price: low-to-high</option>
            <option value="PriceH">Price: high-to-low</option>
          </select>
        </div>
      </div>
      <div className={styles.catalogCards}>
        {products.map((product) => (
          <CatalogCard productData={product} key={product._id} />
        ))}
      </div>
    </>
  );
}
