"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Box,
  Button,
  CircularProgress,
  Container,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { toast } from "sonner";

import {
  useVerifyEmailMutation,
  useResendOTPMutation,
} from "@/src/redux/api/authApi";

export default function VerifyEmailPage() {
  const router = useRouter();

  const [verifyEmail, { isLoading }] =
    useVerifyEmailMutation();

  const [resendOTP, { isLoading: resendLoading }] =
    useResendOTPMutation();

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleVerify = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const res: any = await verifyEmail(
        formData
      ).unwrap();

      toast.success(
        res.message ||
          "Email verified successfully."
      );

      router.push("/login");
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          "Verification failed."
      );
    }
  };

  const handleResendOTP = async () => {
    if (!formData.email) {
      toast.error(
        "Please enter your email."
      );
      return;
    }

    try {
      const res: any =
        await resendOTP(
          formData.email
        ).unwrap();

      toast.success(
        res.message ||
          "OTP sent successfully."
      );
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          "Failed to resend OTP."
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F5F8F4",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 5,
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h4"
           sx={{ fontWeight:700,
            textAlign:"center"}}
            gutterBottom
          >
            Verify Email
          </Typography>

          <Typography
            sx={{color:"text.secondary",
            textAlign:"center",
            mb:4}}
          >
            Enter your email address and
            the OTP sent to your inbox.
          </Typography>

          <Box
            component="form"
            onSubmit={handleVerify}
          >
            <Stack spacing={3}>
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                value={formData.email}
                onChange={handleChange}
                required
              />

              <TextField
                label="OTP"
                name="otp"
                fullWidth
                value={formData.otp}
                onChange={handleChange}
                required
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress
                    size={24}
                    color="inherit"
                  />
                ) : (
                  "Verify Email"
                )}
              </Button>

              <Button
                variant="outlined"
                disabled={resendLoading}
                onClick={handleResendOTP}
              >
                {resendLoading
                  ? "Sending..."
                  : "Resend OTP"}
              </Button>

              <Typography
               sx={{ textAlign:"center"}}
              >
                Already verified?{" "}
                <Link
                  href="/login"
                  underline="hover"
                >
                  Login
                </Link>
              </Typography>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}