// "use client";
// import LogoutDialog from "./LogoutDialog";
// import NavLinks from "./NavLinks";
// import Link from "next/link";

// import {
//   AppBar,
//   Box,
//   Toolbar,
//   Typography,
//   Container,
//   IconButton,
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   Divider,
// } from "@mui/material";
// import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
// import MenuIcon from "@mui/icons-material/Menu";

// import { useRouter } from "next/navigation";
// import { useState } from "react";

// import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
// import { clearUserName, usersSelector } from "@/app/slices/usersSlice";

// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const drawerWidth = 240;

// export default function Navbar() {
//   const [open, setOpen] = useState<boolean>(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const router = useRouter();
//   const dispatch = useAppDispatch();

//   const { userName } = useAppSelector(usersSelector);

//   const handleDrawerToggle = () => {
//     setMobileOpen((prevState) => !prevState);
//   };

//   const handleLogout = () => {
//     setOpen(false);
//     dispatch(clearUserName());

//     toast.success("Logged out successfully!", {
//       autoClose: 1200,
//       onClose: () => router.push("/login"),
//     });
//   };

//   const drawer = (
//     <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
//       <Typography variant="h6" sx={{ my: 2 }}>
//         The Market
//       </Typography>
//       <Divider />
//       <List>
//         <ListItem disablePadding>
//           <ListItemButton
//             component={Link}
//             href="/"
//             sx={{ textAlign: "center" }}
//           >
//             <ListItemText primary="Home" />
//           </ListItemButton>
//         </ListItem>
//         {!userName ? (
//           <>
//             <ListItem disablePadding>
//               <ListItemButton
//                 component={Link}
//                 href="/register"
//                 sx={{ textAlign: "center" }}
//               >
//                 <ListItemText primary="Register" />
//               </ListItemButton>
//             </ListItem>
//             <ListItem disablePadding>
//               <ListItemButton
//                 component={Link}
//                 href="/login"
//                 sx={{ textAlign: "center" }}
//               >
//                 <ListItemText primary="Login" />
//               </ListItemButton>
//             </ListItem>
//           </>
//         ) : (
//           <ListItem disablePadding>
//             <ListItemButton
//               onClick={() => setOpen(true)}
//               sx={{ textAlign: "center" }}
//             >
//               <ListItemText primary="Logout" />
//             </ListItemButton>
//           </ListItem>
//         )}
//       </List>
//     </Box>
//   );

//   return (
//     <Box sx={{ flexGrow: 1, zIndex: 100, position: "relative" }}>
//       <AppBar
//         position="static"
//         sx={{ backgroundColor: "white", color: "black" }}
//       >
//         <Container>
//           <Toolbar>
//             <IconButton
//               color="inherit"
//               aria-label="open drawer"
//               edge="start"
//               onClick={handleDrawerToggle}
//               sx={{ mr: 2, display: { md: "none" } }}
//             >
//               <MenuIcon />
//             </IconButton>

//             <IconButton
//               size="large"
//               edge="start"
//               color="inherit"
//               aria-label="menu"
//               sx={{ display: { xs: "none", md: "flex" } }}
//             >
//               <Link
//                 href="/"
//                 style={{ textDecoration: "none", color: "black", marginTop: 4 }}
//               >
//                 <LocalGroceryStoreIcon />
//               </Link>
//             </IconButton>
//             <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//               {userName ? `Welcome, ${userName}` : "Market"}
//             </Typography>

//             <Box sx={{ display: { xs: "none", md: "block" } }}>
//               <NavLinks
//                 userName={userName}
//                 onLogoutClick={() => setOpen(true)}
//               />
//             </Box>
//           </Toolbar>
//         </Container>
//       </AppBar>
//       <nav>
//         <Drawer
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{
//             keepMounted: true, // Better open performance on mobile.
//           }}
//           sx={{
//             display: { xs: "block", md: "none" },
//             "& .MuiDrawer-paper": {
//               boxSizing: "border-box",
//               width: drawerWidth,
//             },
//           }}
//         >
//           {drawer}
//         </Drawer>
//       </nav>
//       <LogoutDialog
//         open={open}
//         onClose={() => setOpen(false)}
//         onConfirm={handleLogout}
//       />
//     </Box>
//   );
// }
"use client";
import LogoutDialog from "./LogoutDialog";
import NavLinks from "./NavLinks";
import Link from "next/link";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import MenuIcon from "@mui/icons-material/Menu";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { clearUserName, usersSelector } from "@/app/slices/usersSlice";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { userName } = useAppSelector(usersSelector);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    setOpen(false);
    dispatch(clearUserName());

    toast.success("Logged out successfully!", {
      autoClose: 1200,
      onClose: () => router.push("/login"),
    });
  };

  const handleLogoutClick = () => {
    handleCloseNavMenu();
    setOpen(true);
  };

  return (
    <Box sx={{ flexGrow: 1, zIndex: 100, position: "relative" }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", color: "black" }}
      >
        <Container>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              <Link
                href="/"
                style={{ textDecoration: "none", color: "black", marginTop: 4 }}
              >
                <LocalGroceryStoreIcon />
              </Link>
            </IconButton>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {userName ? `Welcome, ${userName}` : "Market"}
            </Typography>

            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <NavLinks
                userName={userName}
                onLogoutClick={() => setOpen(true)}
              />
            </Box>

            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem
                  component={Link}
                  href="/"
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
                {!userName && (
                  <MenuItem
                    component={Link}
                    href="/register"
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign="center">Register</Typography>
                  </MenuItem>
                )}
                {!userName && (
                  <MenuItem
                    component={Link}
                    href="/login"
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>
                )}
                {userName && (
                  <MenuItem onClick={handleLogoutClick}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <LogoutDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleLogout}
      />
    </Box>
  );
}
