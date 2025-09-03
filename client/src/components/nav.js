import { Link } from "react-router-dom";
import styles from "./nav.module.css";
import { useLocation } from 'react-router-dom'

export default function Nav() {
  const location = useLocation()

  const userLinks = [
    {
      linkPath: "/",
      linkName: "Home",
    },
    {
      linkPath: "/catalog",
      linkName: "Coffee Beans",
    },
    {
      linkPath: "/about",
      linkName: "About Us",
    },
  ];

  const adminLinks = [
    {
      linkPath: '/',
      linkName: 'Go back to the App'
    },
    {
      linkPath: '/admin',
      linkName: 'Admin'
    },
    {
      linkPath: '/admin/create',
      linkName: 'Create product'
    },
    {
      linkPath: '/admin/orders',
      linkName: 'Orders'
    },
  ]

  const linksToRender = location.pathname.includes('admin') && !location.pathname.includes('login') ? adminLinks : userLinks
  
  return (
    <div className={styles.navigation}>
      <div className={styles.navInfo}>
        <img src="/favicon.ico" alt="icon" className={styles.navIcon} />
        <h1 className={styles.navName}>NDS Coffee</h1>
      </div>

      <div className={styles.navLinks}>
        {linksToRender.map((link) => (
          <Link
            to={link.linkPath}
            style={{ textDecoration: "none", color: "inherit" }}
            key={link.linkName}
          >
            <p className={styles.navLink}>{link.linkName}</p>
          </Link>
        ))}
      </div>

      <div className={styles.navButtons}>
        <img
          src="/magnifying-glass-solid-full.svg"
          alt="cart"
          className={styles.navButton}
        />
        <img
          src="/cart-shopping-regular-full.svg"
          alt="cart"
          className={styles.navButton}
        />
      </div>
    </div>
  );
}
