"use client";

import Grid from "@mui/material/Grid";

import ProfileHeader from "./ProfileHeader";
import PersonalInfo from "./PersonalInfo";
import ChangePassword from "./ChangePassword";

import { UserProfile } from "@/src/types/profile";

interface ProfileLayoutProps {
  profile: UserProfile;
}

export default function ProfileLayout({
  profile,
}: ProfileLayoutProps) {
  return (
    <Grid container spacing={3}>
      {/* Profile Header */}
      <Grid size={12}>
        <ProfileHeader profile={profile} />
      </Grid>

      {/* Personal Information */}
      <Grid
        size={{
          xs: 12,
          md: 8,
        }}
      >
        <PersonalInfo profile={profile} />
      </Grid>

      {/* Change Password */}
      <Grid
        size={{
          xs: 12,
          md: 4,
        }}
      >
        <ChangePassword />
      </Grid>
    </Grid>
  );
}