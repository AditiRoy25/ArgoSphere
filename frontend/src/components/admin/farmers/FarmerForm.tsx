"use client";

import { Controller, useForm } from "react-hook-form";

import {
  Button,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import type { IFarmer } from "@/src/types/farmer.types";

interface FarmerFormProps {
  defaultValues?: Partial<IFarmer>;
  loading?: boolean;
  onSubmit: (data: Partial<IFarmer>) => void;
}

export default function FarmerForm({
  defaultValues,
  loading = false,
  onSubmit,
}: FarmerFormProps) {
  const { control, handleSubmit } =
    useForm<Partial<IFarmer>>({
      defaultValues,
    });

  return (
    <Paper sx={{ p: 3 }}>
      <Typography
        variant="h5"
        mb={3}
      >
        Farmer Information
      </Typography>

      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Full Name"
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Email"
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Phone"
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  select
                  label="Role"
                >
                  <MenuItem value="farmer">
                    Farmer
                  </MenuItem>

                  <MenuItem value="ngo">
                    NGO
                  </MenuItem>

                  <MenuItem value="officer">
                    Officer
                  </MenuItem>
                </TextField>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Stack
              direction="row"
              justifyContent="flex-end"
            >
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
              >
                Save Changes
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}