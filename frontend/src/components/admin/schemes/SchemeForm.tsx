"use client";

import * as React from "react";

import {
  Grid,
  MenuItem,
  Stack,
  TextField,
  Button,
} from "@mui/material";

import {
  useForm,
  Controller,
} from "react-hook-form";

import {
  CreateSchemePayload,
} from "../../../types/scheme";

interface SchemeFormProps {
  defaultValues?: Partial<CreateSchemePayload>;

  loading?: boolean;

  onSubmit: (
    data: CreateSchemePayload
  ) => void;
}

const initialValues: CreateSchemePayload = {
  title: "",
  description: "",
  amount: 0,
  eligibility: "",
  lastDate: "",
  status: "Active",
  image: "",
};

export default function SchemeForm({
  defaultValues,
  loading = false,
  onSubmit,
}: SchemeFormProps) {
  const {
    register,
    control,
    handleSubmit,
  } = useForm<CreateSchemePayload>({
    defaultValues: {
      ...initialValues,
      ...defaultValues,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container spacing={2}>

        <Grid size={{ xs: 12 }}>
          <TextField
            label="Scheme Title"
            fullWidth
            {...register("title", {
              required: true,
            })}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            {...register(
              "description",
              {
                required: true,
              }
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Amount"
            type="number"
            fullWidth
            {...register("amount", {
              valueAsNumber: true,
            })}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
         <TextField
  label="Last Date"
  type="date"
  fullWidth
  slotProps={{
    inputLabel: {
      shrink: true,
    },
  }}
  {...register("lastDate")}
/>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            label="Eligibility"
            fullWidth
            multiline
            rows={3}
            {...register(
              "eligibility"
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <TextField
                select
                label="Status"
                fullWidth
                {...field}
              >
                <MenuItem value="Active">
                  Active
                </MenuItem>

                <MenuItem value="Closed">
                  Closed
                </MenuItem>
              </TextField>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            label="Image URL"
            fullWidth
            {...register("image")}
          />
        </Grid>

      </Grid>

      <Stack
       sx={{ direction:"row",
        justifyContent:"flex-end",
        spacing:2,
        mt:3}}
      >
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : "Save Scheme"}
        </Button>
      </Stack>
    </form>
  );
}