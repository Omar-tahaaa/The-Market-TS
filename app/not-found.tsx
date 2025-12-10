"use client";
import Link from "next/link";
import { Box, Typography, Button } from "@mui/material";

function NotFound() {
  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        textAlign: "center",
        mt: 4,
      }}
      component="main"
    >
      <Typography variant="h3" fontWeight={600} gutterBottom>
        This page could not be found :(
      </Typography>
      <Button
        component={Link}
        href="/"
        variant="contained"
        color="primary"
        size="large"
        sx={{ px: 6, py: 2, fontSize: "1.1rem" }}
      >
        Go back home
      </Button>
    </Box>
  );
}

export default NotFound;
