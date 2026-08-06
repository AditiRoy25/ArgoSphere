"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, Box, Button, Card, CardContent, Container, TextField, Typography } from "@mui/material";
import { useResetPasswordMutation } from "../../../redux/api/authApi";

type ResetPasswordPageProps = {
  params: Promise<{ token: string }>;
};

export default function ResetPasswordPage({ params }: ResetPasswordPageProps) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setError("");
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const { token } = await params;
      const response = await resetPassword({ token, password }).unwrap();
      setMessage(response.message || "Your password has been reset. You can now log in.");
      setTimeout(() => router.push("/login"), 1500);
    } catch (requestError: unknown) {
      const apiError = requestError as { data?: { message?: string } };
      setError(apiError.data?.message || "This reset link is invalid or has expired.");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F4FAF5", display: "flex", alignItems: "center", py: 3 }}>
      <Container maxWidth="sm">
        <Card elevation={3}>
          <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
            <Typography variant="h4" fontWeight={700}>Set a new password</Typography>
            <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>Choose a new password for your AgroSphere account.</Typography>
            {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Box component="form" onSubmit={submit}>
              <TextField fullWidth required type="password" label="New password" value={password} onChange={(event) => setPassword(event.target.value)} margin="normal" autoComplete="new-password" />
              <TextField fullWidth required type="password" label="Confirm new password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} margin="normal" autoComplete="new-password" />
              <Button fullWidth type="submit" variant="contained" disabled={isLoading || Boolean(message)} sx={{ mt: 2, height: 48 }}>
                {isLoading ? "Resetting password..." : "Reset password"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
