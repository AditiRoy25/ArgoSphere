"use client";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  Controller,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import Grid from "@mui/material/Grid";

import {
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export interface NgoRegistrationFormValues {
  organizationName: string;
  registrationNumber: string;
  address: string;
  logo: File | null;
}

const schema = yup.object({
  organizationName: yup
    .string()
    .required("Organization name is required"),

  registrationNumber: yup
    .string()
    .required("Registration number is required"),

  address: yup
    .string()
    .required("Address is required"),

  logo: yup
    .mixed<File>()
    .nullable()
    .default(null),
});

interface Props {
  loading?: boolean;

  defaultValues?: Partial<NgoRegistrationFormValues>;

  onSubmit: (
    values: NgoRegistrationFormValues
  ) => Promise<void> | void;
}

const initialValues: NgoRegistrationFormValues = {
  organizationName: "",
  registrationNumber: "",
  address: "",
  logo: null,
};

export default function NgoRegistrationForm({
  loading = false,
  defaultValues,
  onSubmit,
}: Props) {

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NgoRegistrationFormValues>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      ...initialValues,
      ...defaultValues,
    },
    mode: "onChange",
  });

  const submit: SubmitHandler<
    NgoRegistrationFormValues
  > = async (data) => {
    await onSubmit(data);
  };

  return (
    <Paper
      sx={{
        p: 4,
        borderRadius: 3,
      }}
    >
      <Typography
        variant="h5"
         sx={{ fontWeight:700,
          mb:4}}
      >
        NGO Registration
      </Typography>

      <form
        onSubmit={handleSubmit(submit)}
        noValidate
      >
        <Grid
          container
          spacing={3}
        >
          <Grid
            size={{
              xs: 12,
            }}
          >
            <TextField
              fullWidth
              label="Organization Name"
              {...register(
                "organizationName"
              )}
              error={
                !!errors.organizationName
              }
              helperText={
                errors.organizationName?.message
              }
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
            }}
          >
            <TextField
              fullWidth
              label="Registration Number"
              {...register(
                "registrationNumber"
              )}
              error={
                !!errors.registrationNumber
              }
              helperText={
                errors.registrationNumber?.message
              }
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
            }}
          >
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Address"
              {...register(
                "address"
              )}
              error={
                !!errors.address
              }
              helperText={
                errors.address?.message
              }
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
            }}
          >
            <Controller
              control={control}
              name="logo"
              render={({ field }) => (
                <>
                  <Typography
                  sx={{  mb:1}}
                  >
                    NGO Logo
                  </Typography>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      field.onChange(
                        e.target.files?.[0] ??
                          null
                      )
                    }
                  />
                </>
              )}
            />
          </Grid>
        </Grid>

        <Stack
         sx={{ mt:4,
          direction:"row",
          justifyContent:"flex-end"}}
        >
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
          >
            {loading
              ? "Submitting..."
              : "Register NGO"}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}