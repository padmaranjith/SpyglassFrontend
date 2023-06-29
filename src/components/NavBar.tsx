import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { IdentityContext } from "../context/IdentityProvider";
import { useLogoutMutation } from "../api/goalApi";

export default function NavBar() {
  const [logout] = useLogoutMutation();

  const userData = useContext(IdentityContext);
  const handleLogout = () => {
    console.log("logout");
    logout();
    window.location.replace("http://localhost:3000");
  };

  return (
    <>
      <Box>
        <AppBar
          position="fixed"
          //color="secondary"

          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: "#0F1B4C",
          }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {/* <Link to="/" style={{ textDecoration: "none", color: "inherit" }}> */}
              Spyglass
              {/* </Link> */}
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

            {userData ? (
              <>
                <span>Hello, {userData.given_name} !</span>
                <Button onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <Link
                to="http://localhost:5000/signin"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Login
              </Link>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      {/* New code */}

      {/* end */}
    </>
  );
}
