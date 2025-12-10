import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function WelcomeContent() {
  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
        borderRadius: 4,
        backgroundColor: "rgba(255,255,255,0.85)",
        boxShadow: 6,
      }}
    >
      <Typography
        variant="h2"
        sx={{
          color: "primary.main",
          fontWeight: 700,
          mb: 3,
          textShadow: "0 2px 8px rgba(0,0,0,0.15)",
          textAlign: "center",
          fontSize: { xs: "2rem", md: "3.75rem" },
        }}
      >
        Welcome To Market
      </Typography>
      <Button
        variant="contained"
        color="info"
        size="large"
        sx={{ fontWeight: 600, px: 4, py: 1.5, fontSize: "1.2rem" }}
        component={Link}
        href="/products"
      >
        Explore our products
      </Button>
    </Box>
  );
}
