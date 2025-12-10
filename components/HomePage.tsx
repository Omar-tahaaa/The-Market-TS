import { Box } from "@mui/material";
import BackgroundImage from "./BackgroundImage";
import WelcomeContent from "./WelcomeContent";

export default function HomePage() {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "calc(100vh - 64px)",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e3f2fd",
      }}
    >
      <BackgroundImage />
      <WelcomeContent />
    </Box>
  );
}
