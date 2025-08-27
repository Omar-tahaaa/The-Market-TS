import { Dialog, DialogActions, Button, Box, Typography } from "@mui/material";

type LogoutDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function LogoutDialog({
  open,
  onClose,
  onConfirm,
}: LogoutDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        },
      }}
    >
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Typography variant="h5" fontWeight={700} color="error" gutterBottom>
          Confirm Logout
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "1.15rem" }}>
          Are you sure you want to logout?
        </Typography>
      </Box>
      <DialogActions sx={{ justifyContent: "center", mt: 2 }}>
        <Button
          onClick={onClose}
          color="primary"
          variant="outlined"
          sx={{ px: 4 }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          sx={{ px: 4 }}
        >
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
}
