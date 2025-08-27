import { Typography } from "@mui/material";

function StatusMessage({ message }: { message: string }) {
  return (
    <Typography variant="h3" align="center" sx={{ my: 4 }}>
      {message}
    </Typography>
  );
}

export default StatusMessage;
