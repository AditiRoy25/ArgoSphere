"use client";

import { useState } from "react";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import EditProfileDialog from "./EditProfileDialog";

import { UserProfile } from "@/src/types/profile";

interface ProfileHeaderProps {
  profile: UserProfile;
}

export default function ProfileHeader({
  profile,
}: ProfileHeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          border: "1px solid #ECECEC",
        }}
      >
        <CardContent>
          <Stack
            direction={{
              xs: "column",
              md: "row",
            }}
            spacing={3}
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Stack
              direction="row"
              spacing={2}
              sx={{ alignItems: "center" }}
            >
              <Avatar
                src={profile.profileImage}
                alt={profile.name}
                sx={{
                  width: 90,
                  height: 90,
                }}
              />

              <Box>
                <Typography
                  variant="h5"
                 sx={{ fontWeight:700}}
                >
                  {profile.name}
                </Typography>

                <Typography
                  color="text.secondary"
                >
                  {profile.email}
                </Typography>

                <Typography
                  color="text.secondary"
                >
                  {profile.role}
                </Typography>

                <Chip
                  label={profile.status}
                  color={
                    profile.status === "active"
                      ? "success"
                      : "error"
                  }
                  size="small"
                  sx={{ mt: 1 }}
                />
              </Box>
            </Stack>

            <Button
              variant="contained"
              onClick={() =>
                setOpen(true)
              }
            >
              Edit Profile
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <EditProfileDialog
        key={profile.updatedAt}
        open={open}
        onClose={() => setOpen(false)}
        profile={profile}
      />
    </>
  );
}
