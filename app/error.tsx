"use client";
import { Box, Typography, Button } from "@mui/material";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <Box
      component="main"
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
    >
      <Typography variant="h3" fontWeight={600} gutterBottom color="error">
        Something went wrong!
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1.2rem" }}>
        {error?.message || "An unexpected error occurred."}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{ px: 6, py: 2, fontSize: "1.1rem" }}
        onClick={reset}
      >
        Try again
      </Button>
    </Box>
  );
}
