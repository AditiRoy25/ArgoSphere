"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";

import {
  useForm,
} from "react-hook-form";

import {
  useUpdateUserMutation,
} from "@/src/redux/api/adminApi";

import type {
  IUser,
} from "@/src/types/user.types";

interface EditUserDialogProps {
  open: boolean;

  onClose: () => void;

  user?: IUser;
}

interface EditUserFormValues {
  name: string;
  email: string;
  phone: string;
  role: string;
  gender: string;
  address: string;
  district: string;
  state: string;
}

export default function EditUserDialog({
  open,
  onClose,
  user,
}: EditUserDialogProps) {

  const [image, setImage] =
    useState<File | null>(null);

  const [
    updateUser,
    {
      isLoading,
    },
  ] =
    useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    reset,
  } =
    useForm<EditUserFormValues>();

  // =====================================
  // SET SELECTED USER DATA
  // =====================================

  useEffect(() => {

    if (user) {
      reset({
        name:
          user.name ?? "",

        email:
          user.email ?? "",

        phone:
          user.phone ?? "",

        role:
          user.role ?? "farmer",

        gender:
          user.gender ?? "",

        address:
          user.address ?? "",

        district:
          user.district ?? "",

        state:
          user.state ?? "",
      });

      setImage(null);
    }

  }, [
    user,
    reset,
  ]);

  // =====================================
  // UPDATE
  // =====================================

  const onSubmit = async (
    data: EditUserFormValues
  ) => {

    if (!user?._id) {
      return;
    }

    try {

      // Because backend uses:
      // UserImage.single("image")
      //
      // We need FormData.

      const formData =
        new FormData();

      formData.append(
        "name",
        data.name
      );

      formData.append(
        "email",
        data.email
      );

      formData.append(
        "phone",
        data.phone
      );

      formData.append(
        "role",
        data.role
      );

      if (data.gender) {
        formData.append(
          "gender",
          data.gender
        );
      }

      formData.append(
        "address",
        data.address
      );

      formData.append(
        "district",
        data.district
      );

      formData.append(
        "state",
        data.state
      );

      // New image only
      if (image) {
        formData.append(
          "image",
          image
        );
      }

      await updateUser({
        id: user._id,

        body: formData,
      }).unwrap();

      console.log(
        "User updated successfully"
      );

      onClose();

    } catch (error) {

      console.error(
        "Update user error:",
        error
      );
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        Edit User
      </DialogTitle>

      <form
        onSubmit={
          handleSubmit(
            onSubmit
          )
        }
      >
        <DialogContent>
          <Grid
            container
            spacing={2}
          >
            {/* NAME */}

            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <TextField
                fullWidth
                label="Name"
                {...register(
                  "name"
                )}
              />
            </Grid>

            {/* EMAIL */}

            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <TextField
                fullWidth
                type="email"
                label="Email"
                {...register(
                  "email"
                )}
              />
            </Grid>

            {/* PHONE */}

            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <TextField
                fullWidth
                label="Phone"
                {...register(
                  "phone"
                )}
              />
            </Grid>

            {/* ROLE */}

            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <TextField
                select
                fullWidth
                label="Role"
                defaultValue=""
                {...register(
                  "role"
                )}
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
            </Grid>

            {/* GENDER */}

            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <TextField
                select
                fullWidth
                label="Gender"
                defaultValue=""
                {...register(
                  "gender"
                )}
              >
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
            </Grid>

            {/* STATE */}

            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <TextField
                fullWidth
                label="State"
                {...register(
                  "state"
                )}
              />
            </Grid>

            {/* DISTRICT */}

            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <TextField
                fullWidth
                label="District"
                {...register(
                  "district"
                )}
              />
            </Grid>

            {/* ADDRESS */}

            <Grid
              size={{
                xs: 12,
              }}
            >
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Address"
                {...register(
                  "address"
                )}
              />
            </Grid>

            {/* IMAGE */}

            <Grid
              size={{
                xs: 12,
              }}
            >
              <Button
                variant="outlined"
                component="label"
              >
                Change Image

                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e) => {

                    const file =
                      e.target
                        .files?.[0];

                    if (file) {
                      setImage(file);
                    }

                  }}
                />
              </Button>

              {image && (
                <div>
                  Selected:{" "}
                  {image.name}
                </div>
              )}
            </Grid>

          </Grid>
        </DialogContent>

        <DialogActions>

          <Button
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
          >
            {isLoading
              ? "Updating..."
              : "Update User"}
          </Button>

        </DialogActions>
      </form>
    </Dialog>
  );
}