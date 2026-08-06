"use client";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  Visibility,
  VisibilityOff,
  LockOutlined,
} from "@mui/icons-material";

import {
  useState,
} from "react";

import {
  useChangePasswordMutation,
} from "@/src/redux/api/profileApi";

export default function ChangePassword() {
  // ================================
  // FORM
  // ================================

  const [
    currentPassword,
    setCurrentPassword,
  ] = useState("");

  const [
    newPassword,
    setNewPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  // ================================
  // VISIBILITY
  // ================================

  const [
    showCurrent,
    setShowCurrent,
  ] = useState(false);

  const [
    showNew,
    setShowNew,
  ] = useState(false);

  const [
    showConfirm,
    setShowConfirm,
  ] = useState(false);

  // ================================
  // MESSAGE
  // ================================

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [
    successMessage,
    setSuccessMessage,
  ] = useState("");

  // ================================
  // API
  // ================================

  const [
    changePassword,
    {
      isLoading,
    },
  ] = useChangePasswordMutation();

  // ================================
  // SUBMIT
  // ================================

  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    // Required

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      setErrorMessage(
        "All password fields are required."
      );

      return;
    }

    // Length

    if (newPassword.length < 6) {
      setErrorMessage(
        "New password must be at least 6 characters."
      );

      return;
    }

    // Match

    if (
      newPassword !==
      confirmPassword
    ) {
      setErrorMessage(
        "New password and confirm password do not match."
      );

      return;
    }

    // Old/new same

    if (
      currentPassword ===
      newPassword
    ) {
      setErrorMessage(
        "New password must be different from current password."
      );

      return;
    }

    try {
      const response =
        await changePassword({
          currentPassword,
          newPassword,
        }).unwrap();

      setSuccessMessage(
        response.message ||
          "Password changed successfully."
      );

      // Clear form

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (error: unknown) {
      console.error(
        "CHANGE PASSWORD ERROR:",
        error
      );

      const apiError =
        error as {
          data?: {
            message?: string;
          };
        };

      setErrorMessage(
        apiError?.data?.message ||
          "Failed to change password."
      );
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 4,
      }}
    >
      <CardContent
        sx={{
          p: 3,
        }}
      >
        {/* HEADER */}

        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          sx={{
            mb: 3,
          }}
        >
          <LockOutlined
            color="success"
          />

          <Box>
            <Typography
              variant="h6"
              fontWeight={700}
            >
              Change Password
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Update your account
              password securely.
            </Typography>
          </Box>
        </Stack>

        {/* ERROR */}

        {errorMessage && (
          <Alert
            severity="error"
            sx={{
              mb: 2,
            }}
          >
            {errorMessage}
          </Alert>
        )}

        {/* SUCCESS */}

        {successMessage && (
          <Alert
            severity="success"
            sx={{
              mb: 2,
            }}
          >
            {successMessage}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
        >
          <Stack spacing={2.5}>

            {/* CURRENT PASSWORD */}

            <TextField
              label="Current Password"
              type={
                showCurrent
                  ? "text"
                  : "password"
              }
              value={
                currentPassword
              }
              onChange={(event) =>
                setCurrentPassword(
                  event.target.value
                )
              }
              fullWidth
              required
              autoComplete="current-password"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        type="button"
                        onClick={() =>
                          setShowCurrent(
                            (value) =>
                              !value
                          )
                        }
                        edge="end"
                      >
                        {showCurrent ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            {/* NEW PASSWORD */}

            <TextField
              label="New Password"
              type={
                showNew
                  ? "text"
                  : "password"
              }
              value={newPassword}
              onChange={(event) =>
                setNewPassword(
                  event.target.value
                )
              }
              fullWidth
              required
              autoComplete="new-password"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        type="button"
                        onClick={() =>
                          setShowNew(
                            (value) =>
                              !value
                          )
                        }
                        edge="end"
                      >
                        {showNew ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            {/* CONFIRM PASSWORD */}

            <TextField
              label="Confirm New Password"
              type={
                showConfirm
                  ? "text"
                  : "password"
              }
              value={
                confirmPassword
              }
              onChange={(event) =>
                setConfirmPassword(
                  event.target.value
                )
              }
              fullWidth
              required
              autoComplete="new-password"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        type="button"
                        onClick={() =>
                          setShowConfirm(
                            (value) =>
                              !value
                          )
                        }
                        edge="end"
                      >
                        {showConfirm ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="success"
              fullWidth
              disabled={isLoading}
              sx={{
                height: 48,
                borderRadius: 2,
                fontWeight: 700,
                textTransform: "none",
              }}
            >
              {isLoading
                ? "Changing Password..."
                : "Change Password"}
            </Button>

          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}