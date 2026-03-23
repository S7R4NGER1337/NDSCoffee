import { Link, useLocation } from "react-router-dom";
import styles from "./nav.module.css";
import { useState, useEffect } from "react";

function getCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

export default function Nav() {
  const location = useLocation();
  const [cartCount, setCartCount] = useState(getCartCount);

  useEffect(() => {
    function update() {
      setCartCount(getCartCount());
    }
    window.addEventListener("cartUpdated", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("cartUpdated", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  const userLinks = [
    { linkPath: "/", linkName: "Home" },
    { linkPath: "/catalog", linkName: "Coffee Beans" },
    { linkPath: "/about", linkName: "About Us" },
  ];

  const adminLinks = [
    { linkPath: "/", linkName: "Go back to the App" },
    { linkPath: "/admin", linkName: "Admin" },
    { linkPath: "/admin/create", linkName: "Create product" },
    { linkPath: "/admin/orders", linkName: "Orders" },
  ];

  const isAdmin =
    location.pathname.includes("admin") &&
    !location.pathname.includes("login");
  const linksToRender = isAdmin ? adminLinks : userLinks;

  return (
    <div className={styles.navigation}>
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <div className={styles.navInfo}>
          <img src="/favicon.ico" alt="icon" className={styles.navIcon} />
          <h1 className={styles.navName}>NDS Coffee</h1>
        </div>
      </Link>

      <div className={styles.navLinks}>
        {linksToRender.map((link) => (
          <Link
            to={link.linkPath}
            style={{ textDecoration: "none", color: "inherit" }}
            key={link.linkName}
          >
            <p
              className={`${styles.navLink} ${
                location.pathname === link.linkPath ? styles.navLinkActive : ""
              }`}
            >
              {link.linkName}
            </p>
          </Link>
        ))}
      </div>

      <div className={styles.navButtons}>
        {!isAdmin && (
          <Link to="/cart" style={{ textDecoration: "none", color: "inherit" }}>
            <div className={styles.cartWrapper}>
              <img
                src="/cart-shopping-regular-full.svg"
                alt="cart"
                className={styles.navButton}
              />
              {cartCount > 0 && (
                <span className={styles.cartBadge}>{cartCount}</span>
              )}
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
