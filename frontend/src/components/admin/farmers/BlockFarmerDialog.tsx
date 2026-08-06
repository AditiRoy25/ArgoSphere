"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";

interface BlockFarmerDialogProps {
  open: boolean;
  isBlocked: boolean;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function BlockFarmerDialog({
  open,
  isBlocked,
  loading = false,
  onClose,
  onConfirm,
}: BlockFarmerDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>
        {isBlocked
          ? "Unblock Farmer"
          : "Block Farmer"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2}>
          <Typography>
            {isBlocked
              ? "Are you sure you want to unblock this farmer?"
              : "Are you sure you want to block this farmer?"}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            {isBlocked
              ? "The farmer will be able to log in and use the platform again."
              : "The farmer will not be able to log in until the account is unblocked."}
          </Typography>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          color={
            isBlocked
              ? "success"
              : "error"
          }
          onClick={onConfirm}
          disabled={loading}
        >
          {loading
            ? "Please wait..."
            : isBlocked
            ? "Unblock"
            : "Block"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}