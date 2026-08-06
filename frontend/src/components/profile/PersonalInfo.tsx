"use client";

import {
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import { UserProfile } from "@/src/types/profile";

interface PersonalInfoProps {
  profile: UserProfile;
}

export default function PersonalInfo({
  profile,
}: PersonalInfoProps) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid #ECECEC",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, mb: 3 }}
        >
          Personal Information
        </Typography>

        <Stack spacing={2}>
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between" }}
          >
            <Typography color="text.secondary">
              Phone
            </Typography>

            <Typography sx={{ fontWeight: 600 }}>
              {profile.phone || "-"}
            </Typography>
          </Stack>

          <Divider />

          <Stack
            direction="row"
            sx={{ justifyContent: "space-between" }}
          >
            <Typography color="text.secondary">
              Gender
            </Typography>

            <Typography sx={{ fontWeight: 600 }}>
              {profile.gender || "-"}
            </Typography>
          </Stack>

          <Divider />

          <Stack
            direction="row"
            sx={{ justifyContent: "space-between" }}
          >
            <Typography color="text.secondary">
              Address
            </Typography>

            <Typography sx={{ fontWeight: 600 }}>
              {profile.address || "-"}
            </Typography>
          </Stack>

          <Divider />

          <Stack
            direction="row"
            sx={{ justifyContent: "space-between" }}
          >
            <Typography color="text.secondary">
              District
            </Typography>

            <Typography sx={{ fontWeight: 600 }}>
              {profile.district || "-"}
            </Typography>
          </Stack>

          <Divider />

          <Stack
            direction="row"
            sx={{ justifyContent: "space-between" }}
          >
            <Typography color="text.secondary">
              State
            </Typography>

            <Typography sx={{ fontWeight: 600 }}>
              {profile.state || "-"}
            </Typography>
          </Stack>

          <Divider />

          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Typography color="text.secondary">
              Email Verification
            </Typography>

            <Chip
              label={
                profile.isEmailVerified
                  ? "Verified"
                  : "Not Verified"
              }
              color={
                profile.isEmailVerified
                  ? "success"
                  : "warning"
              }
              size="small"
            />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
