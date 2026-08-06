"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
  Avatar,
} from "@mui/material";

import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

interface Props {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  loading?: boolean;
  userName?: string;
}

export default function DeleteUserDialog({
  open,
  onClose,
  onDelete,
  loading = false,
  userName,
}: Props) {
  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>
        Delete User
      </DialogTitle>

      <DialogContent>
        <Stack
         sx={{ spacing:2,
          alignItems:"center",
          py:2}}
        >
          <Avatar
            sx={{
              width: 70,
              height: 70,
              bgcolor: "error.light",
            }}
          >
            <WarningAmberRoundedIcon
              color="error"
              fontSize="large"
            />
          </Avatar>

          <Typography
            variant="h6"
           sx={{ fontWeight:600,
            align:"center"}}
          >
            Are you sure?
          </Typography>

          <Typography
            align="center"
            color="text.secondary"
          >
            You are about to delete{" "}
            <strong>{userName}</strong>.
          </Typography>

          <Typography
            align="center"
            color="error.main"
            variant="body2"
          >
            This action cannot be undone.
          </Typography>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={onDelete}
          loading={loading}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}