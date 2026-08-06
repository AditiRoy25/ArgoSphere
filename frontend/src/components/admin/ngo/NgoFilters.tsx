"use client";

import { ChangeEvent } from "react";

import {
  Button,
  Grid,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";

export interface NgoFilterValues {
  search: string;
  status: string;
  verified: string;
}

interface NgoFiltersProps {
  values: NgoFilterValues;
  onChange: (
    key: keyof NgoFilterValues,
    value: string
  ) => void;
  onReset: () => void;
}

export default function NgoFilters({
  values,
  onChange,
  onReset,
}: NgoFiltersProps) {
  const handleChange =
    (key: keyof NgoFilterValues) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement
      >
    ) => {
      onChange(key, event.target.value);
    };

  return (
    <Grid
      container
     sx={{ spacing:2,
      mb:3}}
    >
      <Grid
        size={{
          xs: 12,
          md: 4,
        }}
      >
        <TextField
          fullWidth
          label="Search NGO"
          placeholder="Name or Email"
          value={values.search}
          onChange={handleChange("search")}
        />
      </Grid>

      <Grid
        size={{
          xs: 12,
          md: 3,
        }}
      >
        <TextField
          fullWidth
          select
          label="Status"
          value={values.status}
          onChange={handleChange("status")}
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

      <Grid
        size={{
          xs: 12,
          md: 3,
        }}
      >
        <TextField
          fullWidth
          select
          label="Verification"
          value={values.verified}
          onChange={handleChange("verified")}
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

      <Grid
        size={{
          xs: 12,
          md: 2,
        }}
      >
        <Stack
        sx={{  height:"100%",
          justifyContent:"center"}}
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