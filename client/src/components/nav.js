import { Link } from 'react-router-dom';
import styles from './nav.module.css'

export default function Nav(navData) {

  const links = [
    {
      linkPath: '/',
      linkName: 'Home'
    },
    {
      linkPath: '/catalog',
      linkName: 'Coffee Beans'
    },
    {
      linkPath: '/',
      linkName: 'About Us'
    },
  ]
  
  return(
      <div className={styles.navigation}>
        <div className={styles.navInfo}>
          <img src='/favicon.ico' alt='icon' className={styles.navIcon}/>
          <h1 className={styles.navName}>NDS Coffee</h1>
        </div>

        <div className={styles.navLinks}>
          {links.map(link => 
            <Link to={link.linkPath} style={{ textDecoration: 'none', color: 'inherit' }} key={link.linkName}>
              <p className={styles.navLink}>{link.linkName}</p>
           </Link>
          )}
        </div>

        <div className={styles.navButtons}>
          <img src='/magnifying-glass-solid-full.svg' alt='cart' className={styles.navButton}/>
          <img src='/cart-shopping-regular-full.svg' alt='cart' className={styles.navButton}/>
        </div>
      </div>
  )
}