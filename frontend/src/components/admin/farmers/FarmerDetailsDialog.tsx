"use client";

import {
  Avatar,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import type { IFarmer } from "@/src/types/farmer.types";

interface FarmerDetailsDialogProps {
  open: boolean;
  farmer: IFarmer | null;
  onClose: () => void;
}

export default function FarmerDetailsDialog({
  open,
  farmer,
  onClose,
}: FarmerDetailsDialogProps) {
  if (!farmer) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        Farmer Details
      </DialogTitle>

      <DialogContent dividers>
        <Stack
          spacing={3}
          alignItems="center"
          mb={3}
        >
          <Avatar
            src={farmer.profileImage}
            alt={farmer.name}
            sx={{
              width: 100,
              height: 100,
            }}
          />

          <Typography variant="h5">
            {farmer.name}
          </Typography>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Email
            </Typography>

            <Typography>
              {farmer.email}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Phone
            </Typography>

            <Typography>
              {farmer.phone}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Role
            </Typography>

            <Typography>
              {farmer.role}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Joined
            </Typography>

            <Typography>
              {farmer.createdAt
                ? new Date(
                    farmer.createdAt
                  ).toLocaleDateString()
                : "-"}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Verification
            </Typography>

            <Chip
              label={
                farmer.isVerified
                  ? "Verified"
                  : "Pending"
              }
              color={
                farmer.isVerified
                  ? "success"
                  : "warning"
              }
              sx={{ mt: 1 }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Account Status
            </Typography>

            <Chip
              label={
                farmer.isBlocked
                  ? "Blocked"
                  : "Active"
              }
              color={
                farmer.isBlocked
                  ? "error"
                  : "success"
              }
              sx={{ mt: 1 }}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          onClick={onClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}