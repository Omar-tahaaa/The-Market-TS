import { Box, Paper, Typography } from "@mui/material";
import React, { ReactNode } from "react";

interface FormStructureProps {
  type: string;
  children?: ReactNode;
}

const FormStructure: React.FC<FormStructureProps> = ({ type, children }) => {
  return (
    <Box
      sx={{
        minHeight: "90vh",
        bgcolor: "#f5f6fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          minWidth: 350,
          maxWidth: 400,
          width: "100%",
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{ color: "primary.main", mb: 3, fontWeight: 600 }}
        >
          {type}
        </Typography>
        {children}
      </Paper>
    </Box>
  );
};

export default FormStructure;
