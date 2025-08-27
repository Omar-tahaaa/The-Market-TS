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
} from "@mui/material";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { clearUserName, usersSelector } from "@/app/slices/usersSlice";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { userName } = useAppSelector(usersSelector);

  const handleLogout = () => {
    setOpen(false);
    dispatch(clearUserName());

    toast.success("Logged out successfully!", {
      autoClose: 1200,
      onClose: () => router.push("/login"),
    });
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

            <NavLinks userName={userName} onLogoutClick={() => setOpen(true)} />
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
