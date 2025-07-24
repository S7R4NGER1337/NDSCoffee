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
            <Link to={link.linkPath} style={{ textDecoration: 'none', color: 'inherit' }}>
              <p className='navLink'>{link.linkName}</p>
            </Link>
          )}
      </div>
    </div>
  )
  // return (
  //   <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
  //     <AppBar position="static">
  //       <Toolbar style={{ display: 'flex' }}>
  //         <Link to={'/admin'} style={{ textDecoration: 'none', color: 'inherit' }}>
  //           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
  //             {navData.navName}
  //           </Typography>
  //         </Link>

  //         <div style={{justifyContent: 'center'}}>
  //           {navData.navLinks.map(link =>
  //             <Link to={link.linkPath} style={{ textDecoration: 'none', color: 'inherit' }}>
  //               <Button color="inherit">{link.linkName}</Button>
  //             </Link>
  //           )}
  //         </div>

  //       </Toolbar>
  //     </AppBar>
  //   </Box>
  // )
}