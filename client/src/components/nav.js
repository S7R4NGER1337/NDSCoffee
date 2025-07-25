// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import './nav.css'

export default function Nav(navData) {

  return(
    <div className="navigation">
      <h1 className='navName'>{navData.navName}</h1>
      <div className="navLinks">
          {navData['navLinks'].map(link =>
            link.linkPath !== '/about' ?
            <Link to={link.linkPath} style={{ textDecoration: 'none', color: 'inherit' }} key={link.linkPath}>
              <p className='navLink'>{link.linkName}</p>
            </Link> : 
            <p className='navLink' onClick={() => navData.aboutRef.current?.scrollIntoView({ behavior: 'smooth' })} key={link.linkPath}> About </p>
          )}
      </div>
    </div>
  )
}