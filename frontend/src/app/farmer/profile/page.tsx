"use client";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";

import ProfileLayout from "@/src/components/profile/ProfileLayout";

import {
  useMyProfileQuery,
} from "@/src/redux/api/profileApi";

export default function FarmerProfilePage() {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useMyProfileQuery();

  console.log("PROFILE DATA:", data);
  console.log("PROFILE ERROR:", error);

  // ========================================
  // LOADING
  // ========================================

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress color="success" />
      </Box>
    );
  }

  // ========================================
  // ERROR
  // ========================================

  if (isError) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert
          severity="error"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => refetch()}
            >
              Retry
            </Button>
          }
        >
          Failed to load profile.
        </Alert>

        {process.env.NODE_ENV === "development" && (
          <Box
            component="pre"
            sx={{
              mt: 2,
              p: 2,
              bgcolor: "#fff",
              borderRadius: 2,
              overflow: "auto",
              fontSize: 12,
            }}
          >
            {JSON.stringify(error, null, 2)}
          </Box>
        )}
      </Box>
    );
  }

  // ========================================
  // PROFILE NOT FOUND
  // ========================================

  if (!data?.profile) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning">
          Profile information not found.
        </Alert>
      </Box>
    );
  }

  // ========================================
  // PROFILE
  // ========================================

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      {isFetching && (
        <Box
          sx={{
            position: "fixed",
            top: 20,
            right: 20,
            zIndex: 1500,
          }}
        >
          <CircularProgress
            size={22}
            color="success"
          />
        </Box>
      )}

      <ProfileLayout
        profile={data.profile}
      />
    </Box>
  );
}