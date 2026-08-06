"use client";

import {
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import BusinessIcon from "@mui/icons-material/Business";
import BadgeIcon from "@mui/icons-material/Badge";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VerifiedIcon from "@mui/icons-material/Verified";

import type { INgo } from "@/src/types/ngo.types";

interface Props {
  ngo: INgo;
}

export default function NgoContactCard({
  ngo,
}: Props) {
  return (
    <Card
      sx={{
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
         sx={{ fontWeight:700,
          mb:3}}
        >
          NGO Details
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Stack spacing={3}>
          {/* Organization */}

          <Stack
             sx={{direction:"row",
            spacing:2,
            alignItems:"center"}}
          >
            <BusinessIcon color="primary" />

            <Stack>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Organization Name
              </Typography>

              <Typography     sx={{ fontWeight:600}}>
                {ngo.organizationName}
              </Typography>
            </Stack>
          </Stack>

          {/* Registration */}

          <Stack
            sx={{direction:"row",
            spacing:2,
            alignItems:"center"}}
          >
            <BadgeIcon color="secondary" />

            <Stack>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Registration Number
              </Typography>

              <Typography     sx={{ fontWeight:600}}>
                {ngo.registrationNumber}
              </Typography>
            </Stack>
          </Stack>

          {/* Address */}

          <Stack
           sx={{direction:"row",
            spacing:2,
            alignItems:"center"}}
          >
            <LocationOnIcon color="action" />

            <Stack>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Address
              </Typography>

              <Typography
              sx={{ fontWeight:600}}>
                {ngo.address ||
                  "Not Available"}
              </Typography>
            </Stack>
          </Stack>

          {/* Approval */}

          <Stack spacing={1}>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Approval Status
            </Typography>

            <Chip
              icon={<VerifiedIcon />}
              label={
                ngo.ministryApproval
                  ? "Ministry Approved"
                  : "Pending Approval"
              }
              color={
                ngo.ministryApproval
                  ? "success"
                  : "warning"
              }
              sx={{
                width: "fit-content",
              }}
            />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}