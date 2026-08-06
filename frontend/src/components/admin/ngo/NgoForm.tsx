"use client";

import { Controller, useForm } from "react-hook-form";

import Grid from "@mui/material/Grid";

import {
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import type { INgo } from "@/src/types/ngo.types";

interface NgoFormProps {
  defaultValues?: Partial<INgo>;
  loading?: boolean;
  onSubmit: (
    data: Partial<INgo>
  ) => Promise<void> | void;
}

export default function NgoForm({
  defaultValues,
  loading = false,
  onSubmit,
}: NgoFormProps) {
  const {
    control,
    handleSubmit,
  } = useForm<Partial<INgo>>({
    defaultValues: {
      organizationName: "",
      registrationNumber: "",
      address: "",
      ...defaultValues,
    },
  });

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight:700,
          mb:3}}
      >
        NGO Information
      </Typography>

      <form
        onSubmit={handleSubmit(async (data) => {
          await onSubmit(data);
        })}
      >
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
            <Controller
              name="organizationName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Organization Name"
                />
              )}
            />
          </Grid>

          {/* Registration */}

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Controller
              name="registrationNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Registration Number"
                />
              )}
            />
          </Grid>

          {/* Address */}

          <Grid
            size={{
              xs: 12,
            }}
          >
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  multiline
                  rows={4}
                  label="Address"
                />
              )}
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
            }}
          >
            <Stack
             sx={{ direction:"row",
              justifyContent:"flex-end"}}
            >
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : "Save NGO"}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}