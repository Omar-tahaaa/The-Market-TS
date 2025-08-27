"use client";
import { Box, CircularProgress, Typography, Backdrop } from "@mui/material";

export default function LoadingCenter({
  label = "Loading…",
  size = 48,
  thickness = 4,
  backdrop = false,
  fullscreen = true,
}) {
  const content = (
    <Box
      role="status"
      aria-busy="true"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        width: "100%",
        height: fullscreen ? "100dvh" : "100%",
        p: 2,
      }}
    >
      <CircularProgress size={size} thickness={thickness} />
      {label ? (
        <Typography variant="body2" component="div" sx={{ opacity: 0.8 }}>
          {label}
        </Typography>
      ) : null}
    </Box>
  );

  if (backdrop) {
    return (
      <Backdrop
        open
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 1 }}
      >
        {content}
      </Backdrop>
    );
  }

  return (
    <Box sx={{ width: "100%", height: fullscreen ? "100dvh" : "100%" }}>
      {content}
    </Box>
  );
}
