"use client";

import {
  Alert,
  Box,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";

import SchemeCard from "./SchemeCard";

import type {
  GovernmentScheme,
} from "@/src/types/scheme";

// ==========================================
// PROPS
// ==========================================

interface Props {
  schemes: GovernmentScheme[];

  loading?: boolean;

  error?: boolean;

  isLoggedIn?: boolean;

  isFarmer?: boolean;

  appliedSchemeIds?: Set<string>;

  applyingSchemeId?: string | null;

  onApply?: (
    schemeId: string
  ) => void;
}

// ==========================================
// COMPONENT
// ==========================================

export default function SchemeList({
  schemes,

  loading = false,

  error = false,

  isLoggedIn = false,

  isFarmer = false,

  appliedSchemeIds = new Set(),

  applyingSchemeId = null,

  onApply,
}: Props) {
  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 10,
        }}
      >
        <CircularProgress color="success" />
      </Box>
    );
  }

  // ========================================
  // ERROR
  // ========================================

  if (error) {
    return (
      <Alert severity="error">
        Failed to load government schemes.
      </Alert>
    );
  }

  // ========================================
  // EMPTY
  // ========================================

  if (schemes.length === 0) {
    return (
      <Box
        sx={{
          py: 10,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          gutterBottom
        >
          No Government Schemes Found
        </Typography>

        <Typography
          color="text.secondary"
        >
          No schemes are available at the
          moment.
        </Typography>
      </Box>
    );
  }

  // ========================================
  // LIST
  // ========================================

  return (
    <Grid
      container
      spacing={3}
    >
      {schemes.map(
        (scheme) => (
          <Grid
            key={scheme._id}
            size={{
              xs: 12,
              sm: 6,
              lg: 4,
            }}
          >
            <SchemeCard
              scheme={scheme}
              isLoggedIn={
                isLoggedIn
              }
              isFarmer={
                isFarmer
              }
              alreadyApplied={appliedSchemeIds.has(
                scheme._id
              )}
              applying={
                applyingSchemeId ===
                scheme._id
              }
              onApply={
                onApply
              }
            />
          </Grid>
        )
      )}
    </Grid>
  );
}