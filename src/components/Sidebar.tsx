import {
  Avatar,
  Box,
  Drawer,
  CssBaseline,
  Toolbar,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { BiSolidDashboard } from "react-icons/bi";
import { GoGoal } from "react-icons/go";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { IdentityContext } from "../context/IdentityProvider";

import NavBar from "./NavBar";
const drawerWidth = 240;

export default function Sidebar() {
  const userData = useContext(IdentityContext);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <NavBar />
      {userData ? (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Avatar alt={userData.name} src={userData.picture} />
                </ListItemIcon>
                <ListItemText primary={userData.given_name} />
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/goal">
                  <ListItemIcon>
                    <BiSolidDashboard />{" "}
                  </ListItemIcon>
                  <ListItemText primary="Goal Dashboard" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/creategoal">
                  <ListItemIcon>
                    <GoGoal />{" "}
                  </ListItemIcon>
                  <ListItemText primary="Create New Goal" />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
          </Box>
        </Drawer>
      ) : (
        <></>
      )}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {userData == null && <Link to="/landing"></Link>}
      </Box>
    </Box>
  );
}
