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

interface BlockNgoDialogProps {
  open: boolean;
  isBlocked: boolean;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function BlockNgoDialog({
  open,
  isBlocked,
  loading = false,
  onClose,
  onConfirm,
}: BlockNgoDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>
        {isBlocked ? "Unblock NGO" : "Block NGO"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2}>
          <Typography>
            {isBlocked
              ? "Are you sure you want to unblock this NGO?"
              : "Are you sure you want to block this NGO?"}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            {isBlocked
              ? "The NGO will be able to access the platform again."
              : "The NGO will not be able to log in until it is unblocked."}
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
          disabled={loading}
          onClick={onConfirm}
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