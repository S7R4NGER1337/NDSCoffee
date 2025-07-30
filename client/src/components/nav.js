// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import styles from './nav.module.css'

export default function Nav(navData) {

  const navColor = navData.navName === 'Admin Panel' ? 'black':'white'
  
  return(
    <div className={styles.navigation} style={{color: navColor}}>
      <h1 className={styles.navName}>{navData.navName}</h1>
      <div className={styles.navLinks}>
          {navData['navLinks'].map(link =>
            link.linkPath !== '/about' ?
            <Link to={link.linkPath} style={{ textDecoration: 'none', color: 'inherit' }} key={link.linkPath}>
              <p className={styles.navLink}>{link.linkName}</p>
            </Link> : 
            <p className={styles.navLink} onClick={() => navData.aboutRef.current?.scrollIntoView({ behavior: 'smooth' })} key={link.linkPath}> About </p>
          )}
      </div>
    </div>
  )
}