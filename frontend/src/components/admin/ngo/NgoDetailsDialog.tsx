"use client";

import {
  Avatar,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import VerifiedIcon from "@mui/icons-material/Verified";
import BadgeIcon from "@mui/icons-material/Badge";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import type { INgo } from "@/src/types/ngo.types";

const imageUrl = (value?: string) => {
  if (!value) return undefined;
  if (/^(https?:|data:|blob:)/i.test(value)) return value;
  return `${process.env.NEXT_PUBLIC_API_URL}/${value.replace(/^\//, "")}`;
};

interface NgoDetailsDialogProps {
  open: boolean;
  ngo: INgo | null;
  onClose: () => void;
}

export default function NgoDetailsDialog({
  open,
  ngo,
  onClose,
}: NgoDetailsDialogProps) {
  if (!ngo) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        NGO Details
      </DialogTitle>

      <DialogContent dividers>
        <Stack
         sx={{ spacing:3,
          alignItems:"center",
          mb:3}}
        >
          <Avatar
            src={imageUrl(
              ngo.logo ||
                (typeof ngo.user === "string"
                  ? undefined
                  : ngo.user.image)
            )}
            sx={{
              width: 120,
              height: 120,
            }}
          />

          <Typography
            variant="h5"
           sx={{ fontWeight:700}}
          >
            {ngo.organizationName}
          </Typography>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        <Grid
          container
          spacing={3}
        >
          {/* Organization */}

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Organization Name
            </Typography>

            <Typography>
              {ngo.organizationName}
            </Typography>
          </Grid>

          {/* Registration */}

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Registration Number
            </Typography>

            <Typography>
              {ngo.registrationNumber}
            </Typography>
          </Grid>

          {/* Address */}

          <Grid
            size={{
              xs: 12,
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Address
            </Typography>

            <Typography>
              {ngo.address || "-"}
            </Typography>
          </Grid>

          {/* Approval */}

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{mb:1}}
            >
              Ministry Approval
            </Typography>

            <Chip
              icon={<VerifiedIcon />}
              label={
                ngo.ministryApproval
                  ? "Approved"
                  : "Pending"
              }
              color={
                ngo.ministryApproval
                  ? "success"
                  : "warning"
              }
            />
          </Grid>

          {/* Created */}

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Created At
            </Typography>

            <Typography>
              {ngo.createdAt
                ? new Date(
                    ngo.createdAt
                  ).toLocaleDateString()
                : "-"}
            </Typography>
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
