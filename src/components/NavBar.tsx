

import {AppBar,Box,Toolbar,Typography,Button, IconButton} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link,useNavigate } from 'react-router-dom';
export default function NavBar() {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    const handleLogout =()=>{
       console.log("logout");
       localStorage.removeItem('username');
       navigate('/');
    }

    return (
    
    <Box sx={{ flexGrow: 1 }}>
     <AppBar position="static" color = "secondary">
        <Toolbar>            
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/"  style={{textDecoration : 'none', color: 'inherit'}}>
            Spyglass
            </Link>
          </Typography>
          <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircleIcon />
              </IconButton>
              
          {/* <Button style={{textDecoration : 'none',  color:'inherit'}}>{username ? `Hello, ${username} !` : 'Login'}</Button> */}
          
          {username ? (
        <>
          <span>Hello, {username} !</span>
          <Button onClick={handleLogout}>Logout</Button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}


        </Toolbar>
      </AppBar>
      </Box>
     
  );
}
