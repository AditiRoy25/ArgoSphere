"use client";

import {
  Button,
  Grid,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";

import { ChangeEvent } from "react";

export interface FarmerFilterValues {
  search: string;
  status: string;
  verified: string;
}

interface FarmerFiltersProps {
  values: FarmerFilterValues;
  onChange: (
    key: keyof FarmerFilterValues,
    value: string
  ) => void;
  onReset: () => void;
}

export default function FarmerFilters({
  values,
  onChange,
  onReset,
}: FarmerFiltersProps) {
  const handleInput =
    (key: keyof FarmerFilterValues) =>
    (
      e: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement
      >
    ) => {
      onChange(key, e.target.value);
    };

  return (
    <Grid container spacing={2} mb={3}>
      <Grid size={{ xs: 12, md: 4 }}>
        <TextField
          fullWidth
          label="Search Farmer"
          placeholder="Name, Email..."
          value={values.search}
          onChange={handleInput("search")}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <TextField
          fullWidth
          select
          label="Status"
          value={values.status}
          onChange={handleInput("status")}
        >
          <MenuItem value="">
            All
          </MenuItem>

          <MenuItem value="active">
            Active
          </MenuItem>

          <MenuItem value="blocked">
            Blocked
          </MenuItem>
        </TextField>
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <TextField
          fullWidth
          select
          label="Verification"
          value={values.verified}
          onChange={handleInput("verified")}
        >
          <MenuItem value="">
            All
          </MenuItem>

          <MenuItem value="true">
            Verified
          </MenuItem>

          <MenuItem value="false">
            Pending
          </MenuItem>
        </TextField>
      </Grid>

      <Grid size={{ xs: 12, md: 2 }}>
        <Stack
          height="100%"
          justifyContent="center"
        >
          <Button
            fullWidth
            variant="outlined"
            onClick={onReset}
          >
            Reset
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}