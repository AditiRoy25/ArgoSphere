"use client";

import {
  ChangeEvent,
  useEffect,
  useState,
} from "react";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import {
  Controller,
  useForm,
} from "react-hook-form";

import {
  useCreateUserMutation,
} from "@/src/redux/api/adminApi";

// ====================================
// TYPES
// ====================================

interface Props {
  open: boolean;
  onClose: () => void;
}

interface AddUserFormValues {
  name: string;
  email: string;
  phone: string;
  password: string;

  role:
    | "farmer"
    | "ngo"
    | "officer"
    | "ministry"
    | "admin";

  gender:
    | ""
    | "male"
    | "female"
    | "other";

  address: string;
  district: string;
  state: string;

  image: File | null;
}

// ====================================
// INITIAL VALUES
// ====================================

const initialValues: AddUserFormValues = {
  name: "",
  email: "",
  phone: "",
  password: "",
  role: "farmer",
  gender: "",
  address: "",
  district: "",
  state: "",
  image: null,
};

export default function AddUserDialog({
  open,
  onClose,
}: Props) {
  // ====================================
  // API
  // ====================================

  const [
    createUser,
    {
      isLoading,
      error,
      reset: resetMutation,
    },
  ] = useCreateUserMutation();

  // ====================================
  // IMAGE PREVIEW
  // ====================================

  const [
    imagePreview,
    setImagePreview,
  ] = useState<string | null>(
    null
  );

  // ====================================
  // FORM
  // ====================================

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: {
      errors,
    },
  } =
    useForm<AddUserFormValues>({
      defaultValues:
        initialValues,
    });

  // ====================================
  // CLEAN IMAGE PREVIEW
  // ====================================

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(
          imagePreview
        );
      }
    };
  }, [imagePreview]);

  // ====================================
  // IMAGE CHANGE
  // ====================================

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    // Validate file type

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      return;
    }

    // 5MB validation

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      return;
    }

    if (imagePreview) {
      URL.revokeObjectURL(
        imagePreview
      );
    }

    setValue(
      "image",
      file,
      {
        shouldValidate: true,
      }
    );

    setImagePreview(
      URL.createObjectURL(
        file
      )
    );
  };

  // ====================================
  // REMOVE IMAGE
  // ====================================

  const handleRemoveImage =
    () => {
      if (imagePreview) {
        URL.revokeObjectURL(
          imagePreview
        );
      }

      setImagePreview(null);

      setValue(
        "image",
        null
      );
    };

  // ====================================
  // CLOSE
  // ====================================

  const handleClose = () => {
    if (imagePreview) {
      URL.revokeObjectURL(
        imagePreview
      );
    }

    setImagePreview(null);

    reset(initialValues);

    resetMutation();

    onClose();
  };

  // ====================================
  // SUBMIT
  // ====================================

  const onSubmit = async (
    values: AddUserFormValues
  ) => {
    try {
      const formData =
        new FormData();

      formData.append(
        "name",
        values.name
      );

      formData.append(
        "email",
        values.email
      );

      formData.append(
        "phone",
        values.phone
      );

      formData.append(
        "password",
        values.password
      );

      formData.append(
        "role",
        values.role
      );

      if (values.gender) {
        formData.append(
          "gender",
          values.gender
        );
      }

      if (values.address) {
        formData.append(
          "address",
          values.address
        );
      }

      if (values.district) {
        formData.append(
          "district",
          values.district
        );
      }

      if (values.state) {
        formData.append(
          "state",
          values.state
        );
      }

      // ==============================
      // IMAGE
      // ==============================

      if (values.image) {
        formData.append(
          "image",
          values.image
        );
      }

      // Debug

      for (
        const [key, value]
        of formData.entries()
      ) {
        console.log(
          key,
          value
        );
      }

      const response =
        await createUser(
          formData
        ).unwrap();

      console.log(
        "User created:",
        response
      );

      handleClose();
    } catch (err) {
      console.error(
        "Create User Error:",
        err
      );
    }
  };

  // ====================================
  // API ERROR
  // ====================================

  const apiError =
    error &&
    "data" in error
      ? (
          error.data as {
            message?: string;
          }
        )?.message
      : undefined;

  return (
    <Dialog
      open={open}
      onClose={
        isLoading
          ? undefined
          : handleClose
      }
      fullWidth
      maxWidth="sm"
    >
      {/* ==========================
          HEADER
      ========================== */}

      <DialogTitle>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            variant="h6"
            fontWeight={700}
          >
            Add New User
          </Typography>

          <IconButton
            onClick={
              handleClose
            }
            disabled={
              isLoading
            }
          >
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>

      {/* ==========================
          FORM
      ========================== */}

      <Box
        component="form"
        onSubmit={handleSubmit(
          onSubmit
        )}
      >
        <DialogContent
          dividers
        >
          <Stack spacing={2.5}>
            {/* API ERROR */}

            {apiError && (
              <Alert severity="error">
                {apiError}
              </Alert>
            )}

            {/* ======================
                IMAGE
            ====================== */}

            <Stack
              alignItems="center"
              spacing={2}
            >
              <Avatar
                src={
                  imagePreview ??
                  undefined
                }
                sx={{
                  width: 110,
                  height: 110,
                  fontSize: 35,
                }}
              />

              <Stack
                direction="row"
                spacing={1}
              >
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={
                    <CloudUploadIcon />
                  }
                >
                  Upload Image

                  <input
                    hidden
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={
                      handleImageChange
                    }
                  />
                </Button>

                {imagePreview && (
                  <Button
                    color="error"
                    onClick={
                      handleRemoveImage
                    }
                  >
                    Remove
                  </Button>
                )}
              </Stack>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                JPG, PNG or WEBP.
                Maximum 5MB.
              </Typography>
            </Stack>

            {/* Register image with RHF */}

            <Controller
              name="image"
              control={control}
              render={() => (
                <></>
              )}
            />

            {/* ======================
                NAME
            ====================== */}

            <Controller
              name="name"
              control={control}
              rules={{
                required:
                  "Name is required",
              }}
              render={({
                field,
              }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Name"
                  error={
                    !!errors.name
                  }
                  helperText={
                    errors.name
                      ?.message
                  }
                />
              )}
            />

            {/* ======================
                EMAIL
            ====================== */}

            <Controller
              name="email"
              control={control}
              rules={{
                required:
                  "Email is required",

                pattern: {
                  value:
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

                  message:
                    "Enter valid email",
                },
              }}
              render={({
                field,
              }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="email"
                  label="Email"
                  error={
                    !!errors.email
                  }
                  helperText={
                    errors.email
                      ?.message
                  }
                />
              )}
            />

            {/* ======================
                PHONE
            ====================== */}

            <Controller
              name="phone"
              control={control}
              rules={{
                required:
                  "Phone is required",
              }}
              render={({
                field,
              }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Phone"
                  error={
                    !!errors.phone
                  }
                  helperText={
                    errors.phone
                      ?.message
                  }
                />
              )}
            />

            {/* ======================
                PASSWORD
            ====================== */}

            <Controller
              name="password"
              control={control}
              rules={{
                required:
                  "Password is required",

                minLength: {
                  value: 6,

                  message:
                    "Minimum 6 characters required",
                },
              }}
              render={({
                field,
              }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="password"
                  label="Password"
                  error={
                    !!errors.password
                  }
                  helperText={
                    errors.password
                      ?.message
                  }
                />
              )}
            />

            {/* ======================
                ROLE
            ====================== */}

            <Controller
              name="role"
              control={control}
              rules={{
                required:
                  "Role is required",
              }}
              render={({
                field,
              }) => (
                <TextField
                  {...field}
                  select
                  fullWidth
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

                  <MenuItem value="ministry">
                    Ministry
                  </MenuItem>

                  <MenuItem value="admin">
                    Admin
                  </MenuItem>
                </TextField>
              )}
            />

            {/* ======================
                GENDER
            ====================== */}

            <Controller
              name="gender"
              control={control}
              render={({
                field,
              }) => (
                <TextField
                  {...field}
                  select
                  fullWidth
                  label="Gender"
                >
                  <MenuItem value="">
                    Select Gender
                  </MenuItem>

                  <MenuItem value="male">
                    Male
                  </MenuItem>

                  <MenuItem value="female">
                    Female
                  </MenuItem>

                  <MenuItem value="other">
                    Other
                  </MenuItem>
                </TextField>
              )}
            />

            {/* ======================
                STATE
            ====================== */}

            <Controller
              name="state"
              control={control}
              render={({
                field,
              }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="State"
                />
              )}
            />

            {/* ======================
                DISTRICT
            ====================== */}

            <Controller
              name="district"
              control={control}
              render={({
                field,
              }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="District"
                />
              )}
            />

            {/* ======================
                ADDRESS
            ====================== */}

            <Controller
              name="address"
              control={control}
              render={({
                field,
              }) => (
                <TextField
                  {...field}
                  fullWidth
                  multiline
                  rows={3}
                  label="Address"
                />
              )}
            />
          </Stack>
        </DialogContent>

        {/* ==========================
            ACTIONS
        ========================== */}

        <DialogActions
          sx={{ p: 2 }}
        >
          <Button
            type="button"
            color="inherit"
            onClick={
              handleClose
            }
            disabled={
              isLoading
            }
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={
              isLoading
            }
          >
            {isLoading
              ? "Creating..."
              : "Create User"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}