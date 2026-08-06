"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, Box, Button, Card, CardContent, Container, TextField, Typography } from "@mui/material";
import { useForgotPasswordMutation } from "../../../redux/api/authApi";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await forgotPassword({ email }).unwrap();
      setMessage(response.message || "If an account exists for this email, a reset link has been sent.");
    } catch (requestError: unknown) {
      const apiError = requestError as { data?: { message?: string } };
      setError(apiError.data?.message || "Unable to send the reset link. Please try again.");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F4FAF5", display: "flex", alignItems: "center", py: 3 }}>
      <Container maxWidth="sm">
        <Card elevation={3}>
          <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
            <Typography variant="h4" fontWeight={700}>Forgot password?</Typography>
            <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
              Enter your email address and we’ll send you a password reset link.
            </Typography>
            {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Box component="form" onSubmit={submit}>
              <TextField fullWidth required type="email" label="Email" value={email} onChange={(event) => setEmail(event.target.value)} margin="normal" autoComplete="email" />
              <Button fullWidth type="submit" variant="contained" disabled={isLoading} sx={{ mt: 2, height: 48 }}>
                {isLoading ? "Sending link..." : "Send reset link"}
              </Button>
              <Button fullWidth type="button" variant="text" onClick={() => router.push("/login")} sx={{ mt: 1 }}>
                Back to login
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
