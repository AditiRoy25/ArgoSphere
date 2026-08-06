"use client";

import { useState } from "react";

import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";

import {
  useUpdateProfileMutation,
} from "@/src/redux/api/profileApi";

import {
  UserProfile,
} from "@/src/types/profile";

interface EditProfileDialogProps {
  open: boolean;
  onClose: () => void;
  profile: UserProfile;
}

export default function EditProfileDialog({
  open,
  onClose,
  profile,
}: EditProfileDialogProps) {
  const [gender, setGender] = useState(profile.gender ?? "");
  const [address, setAddress] = useState(profile.address ?? "");
  const [district, setDistrict] = useState(profile.district ?? "");
  const [state, setState] = useState(profile.state ?? "");

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  const [
    updateProfile,
    { isLoading },
  ] = useUpdateProfileMutation();

  const handleSubmit = async () => {
    setSuccess("");
    setError("");

    try {
      const res =
        await updateProfile({
          gender,
          address,
          district,
          state,
        }).unwrap();

      setSuccess(res.message);

      setTimeout(() => {
        onClose();
      }, 800);
    } catch (err: unknown) {
      const message =
        typeof err === "object" &&
        err !== null &&
        "data" in err &&
        typeof err.data === "object" &&
        err.data !== null &&
        "message" in err.data &&
        typeof err.data.message === "string"
          ? err.data.message
          : "Profile update failed.";

      setError(message);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Edit Profile
      </DialogTitle>

      <DialogContent>
        <Stack
          spacing={2}
          sx={{ mt: 1 }}
        >
          {success && (
            <Alert severity="success">
              {success}
            </Alert>
          )}

          {error && (
            <Alert severity="error">
              {error}
            </Alert>
          )}

          <TextField
            select
            label="Gender"
            value={gender}
            onChange={(e) =>
              setGender(
                e.target.value
              )
            }
            fullWidth
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

          <TextField
            label="Address"
            value={address}
            onChange={(e) =>
              setAddress(
                e.target.value
              )
            }
            fullWidth
          />

          <TextField
            label="District"
            value={district}
            onChange={(e) =>
              setDistrict(
                e.target.value
              )
            }
            fullWidth
          />

          <TextField
            label="State"
            value={state}
            onChange={(e) =>
              setState(
                e.target.value
              )
            }
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading
            ? "Saving..."
            : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
