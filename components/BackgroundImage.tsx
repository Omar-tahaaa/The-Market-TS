import Image from "next/image";
import bg from "@/public/background.webp";
import { Box } from "@mui/material";

export default function BackgroundImage() {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
      }}
    >
      <Image
        src={bg}
        placeholder="blur"
        fill
        alt="Market"
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.35)",
          zIndex: 1,
        }}
      />
    </Box>
  );
}
