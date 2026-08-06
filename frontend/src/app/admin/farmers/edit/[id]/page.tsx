"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import Grid from "@mui/material/Grid";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import {
  useGetFarmerByIdQuery,
} from "@/src/redux/api/farmerApi";

import {
  useUpdateUserMutation,
} from "@/src/redux/api/adminApi";


// ======================================
// FORM TYPE
// ======================================

interface FarmerFormData {
  name: string;
  email: string;
  phone: string;
  gender: string;
  address: string;
  district: string;
  state: string;
}


// ======================================
// PAGE
// ======================================

export default function EditFarmerPage() {
  const router =
    useRouter();

  const params =
    useParams<{
      id: string;
    }>();

  const id =
    params.id;


  // ======================================
  // GET FARMER
  // ======================================

  const {
    data,
    isLoading,
    isError,
  } =
    useGetFarmerByIdQuery(
      id
    );


  // ======================================
  // UPDATE USER
  // ======================================

  const [
    updateUser,
    {
      isLoading:
        isUpdating,
    },
  ] =
    useUpdateUserMutation();


  // ======================================
  // FARMER
  // ======================================

  const farmer =
    data?.data ??
    data?.farmer;


  // ======================================
  // FORM STATE
  // ======================================

  const [
    form,
    setForm,
  ] =
    useState<FarmerFormData>({
      name: "",
      email: "",
      phone: "",
      gender: "",
      address: "",
      district: "",
      state: "",
    });


  // ======================================
  // IMAGE
  // ======================================

  const [
    image,
    setImage,
  ] =
    useState<File | null>(
      null
    );


  const [
    imagePreview,
    setImagePreview,
  ] =
    useState<string>("");


  // ======================================
  // MESSAGE
  // ======================================

  const [
    errorMessage,
    setErrorMessage,
  ] =
    useState("");


  // ======================================
  // LOAD FARMER INTO FORM
  // ======================================

  useEffect(() => {
    if (!farmer) {
      return;
    }

    setForm({
      name:
        farmer.name ?? "",

      email:
        farmer.email ?? "",

      phone:
        farmer.phone ?? "",

      gender:
        farmer.gender ?? "",

      address:
        farmer.address ?? "",

      district:
        farmer.district ?? "",

      state:
        farmer.state ?? "",
    });

    setImagePreview(
      farmer.image ??
        farmer.profileImage ??
        ""
    );
  }, [farmer]);


  // ======================================
  // INPUT CHANGE
  // ======================================

  const handleChange = (
    event:
      React.ChangeEvent<
        HTMLInputElement |
        HTMLTextAreaElement
      >
  ) => {
    const {
      name,
      value,
    } =
      event.target;

    setForm(
      (previous) => ({
        ...previous,

        [name]:
          value,
      })
    );
  };


  // ======================================
  // IMAGE CHANGE
  // ======================================

  const handleImageChange = (
    event:
      React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target
        .files?.[0];

    if (!file) {
      return;
    }

    setImage(file);

    const preview =
      URL.createObjectURL(
        file
      );

    setImagePreview(
      preview
    );
  };


  // ======================================
  // SUBMIT
  // ======================================

  const handleSubmit = async (
    event:
      React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setErrorMessage("");

    try {
      // ==================================
      // FormData
      // ==================================

      const formData =
        new FormData();

      formData.append(
        "name",
        form.name
      );

      formData.append(
        "email",
        form.email
      );

      formData.append(
        "phone",
        form.phone
      );

      // Farmer must remain farmer
      formData.append(
        "role",
        "farmer"
      );

      if (form.gender) {
        formData.append(
          "gender",
          form.gender
        );
      }

      formData.append(
        "address",
        form.address
      );

      formData.append(
        "district",
        form.district
      );

      formData.append(
        "state",
        form.state
      );

      // ==================================
      // IMAGE
      // ==================================

      if (image) {
        formData.append(
          "image",
          image
        );
      }


      // ==================================
      // UPDATE
      // PUT /admin/users/:id
      // ==================================

      await updateUser({
        id,
        body: formData,
      }).unwrap();


      // ==================================
      // REDIRECT
      // ==================================

      router.push(
        `/admin/farmers/${id}`
      );

    } catch (error: any) {
      console.error(
        "UPDATE FARMER ERROR:",
        error
      );

      setErrorMessage(
        error?.data?.message ??
          "Failed to update farmer."
      );
    }
  };


  // ======================================
  // LOADING
  // ======================================

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: 400,

          display:
            "flex",

          alignItems:
            "center",

          justifyContent:
            "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }


  // ======================================
  // ERROR
  // ======================================

  if (
    isError ||
    !farmer
  ) {
    return (
      <Container
        maxWidth="md"
        sx={{
          py: 4,
        }}
      >
        <Alert
          severity="error"
        >
          Farmer not found.
        </Alert>
      </Container>
    );
  }


  // ======================================
  // UI
  // ======================================

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 4,
      }}
    >
      <Stack
        spacing={3}
      >
        {/* =====================
            HEADER
        ===================== */}

        <Stack
          direction="row"
          justifyContent=
            "space-between"
          alignItems=
            "center"
        >
          <Box>
            <Typography
              variant="h4"
              fontWeight={700}
            >
              Edit Farmer
            </Typography>

            <Typography
              color=
                "text.secondary"
            >
              Update farmer
              information
            </Typography>
          </Box>

          <Button
            startIcon={
              <ArrowBackIcon />
            }
            onClick={() =>
              router.back()
            }
          >
            Back
          </Button>
        </Stack>


        {/* =====================
            ERROR MESSAGE
        ===================== */}

        {errorMessage && (
          <Alert
            severity="error"
          >
            {errorMessage}
          </Alert>
        )}


        {/* =====================
            FORM
        ===================== */}

        <Paper
          sx={{
            p: {
              xs: 2,
              md: 4,
            },

            borderRadius: 3,
          }}
        >
          <form
            onSubmit={
              handleSubmit
            }
          >
            <Grid
              container
              spacing={3}
            >
              {/* =====================
                  IMAGE
              ===================== */}

              <Grid
                size={{
                  xs: 12,
                }}
              >
                <Stack
                  spacing={2}
                  alignItems=
                    "center"
                >
                  <Avatar
                    src={
                      imagePreview
                    }
                    alt={
                      form.name
                    }
                    sx={{
                      width: 120,
                      height: 120,
                    }}
                  >
                    {form.name
                      ?.charAt(0)
                      ?.toUpperCase()}
                  </Avatar>

                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={
                      <CloudUploadIcon />
                    }
                  >
                    Change Image

                    <input
                      hidden
                      type="file"
                      accept=
                        "image/*"
                      onChange={
                        handleImageChange
                      }
                    />
                  </Button>

                  {image && (
                    <Typography
                      variant=
                        "body2"
                      color=
                        "text.secondary"
                    >
                      {image.name}
                    </Typography>
                  )}
                </Stack>
              </Grid>


              {/* =====================
                  NAME
              ===================== */}

              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <TextField
                  fullWidth
                  required
                  name="name"
                  label=
                    "Farmer Name"
                  value={
                    form.name
                  }
                  onChange={
                    handleChange
                  }
                />
              </Grid>


              {/* =====================
                  EMAIL
              ===================== */}

              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <TextField
                  fullWidth
                  required
                  type="email"
                  name="email"
                  label="Email"
                  value={
                    form.email
                  }
                  onChange={
                    handleChange
                  }
                />
              </Grid>


              {/* =====================
                  PHONE
              ===================== */}

              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <TextField
                  fullWidth
                  required
                  name="phone"
                  label=
                    "Phone Number"
                  value={
                    form.phone
                  }
                  onChange={
                    handleChange
                  }
                />
              </Grid>


              {/* =====================
                  ROLE
              ===================== */}

              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <TextField
                  fullWidth
                  label="Role"
                  value="Farmer"
                  disabled
                />
              </Grid>


              {/* =====================
                  GENDER
              ===================== */}

              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <TextField
                  select
                  fullWidth
                  name="gender"
                  label="Gender"
                  value={
                    form.gender
                  }
                  onChange={
                    handleChange
                  }
                >
                  <MenuItem
                    value=""
                  >
                    Select Gender
                  </MenuItem>

                  <MenuItem
                    value="male"
                  >
                    Male
                  </MenuItem>

                  <MenuItem
                    value="female"
                  >
                    Female
                  </MenuItem>

                  <MenuItem
                    value="other"
                  >
                    Other
                  </MenuItem>
                </TextField>
              </Grid>


              {/* =====================
                  DISTRICT
              ===================== */}

              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <TextField
                  fullWidth
                  name="district"
                  label="District"
                  value={
                    form.district
                  }
                  onChange={
                    handleChange
                  }
                />
              </Grid>


              {/* =====================
                  STATE
              ===================== */}

              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <TextField
                  fullWidth
                  name="state"
                  label="State"
                  value={
                    form.state
                  }
                  onChange={
                    handleChange
                  }
                />
              </Grid>


              {/* =====================
                  ADDRESS
              ===================== */}

              <Grid
                size={{
                  xs: 12,
                }}
              >
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  name="address"
                  label="Address"
                  value={
                    form.address
                  }
                  onChange={
                    handleChange
                  }
                />
              </Grid>


              {/* =====================
                  SUBMIT
              ===================== */}

              <Grid
                size={{
                  xs: 12,
                }}
              >
                <Stack
                  direction="row"
                  justifyContent=
                    "flex-end"
                  spacing={2}
                >
                  <Button
                    type="button"
                    variant="outlined"
                    disabled={
                      isUpdating
                    }
                    onClick={() =>
                      router.back()
                    }
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    variant=
                      "contained"
                    disabled={
                      isUpdating
                    }
                    startIcon={
                      isUpdating
                        ? (
                          <CircularProgress
                            size={18}
                            color=
                              "inherit"
                          />
                        )
                        : (
                          <SaveIcon />
                        )
                    }
                  >
                    {isUpdating
                      ? "Updating..."
                      : "Update Farmer"}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Stack>
    </Container>
  );
}