"use client";

// import { useState } from "react";
import { useRouter } from "next/navigation";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {
  Box,
  // Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  loginSchema,
  LoginFormData,
} from "../../../validations/login.schema";

import {
  useLoginMutation,
} from "../../../redux/api/authApi";

import { useDispatch } from "react-redux";

import {
  setCredentials,
} from "../../../redux/slices/authSlice";

import {
  roleRoutes,
} from "../../../lib/permissions";

export default function LoginPage() {
  const router = useRouter();

  const dispatch = useDispatch();

  const [loginUser, { isLoading }] =
    useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver:
      zodResolver(loginSchema),
  });

  const onSubmit = async (
    data: LoginFormData
  ) => {
    try {
      const res =
        await loginUser(
          data
        ).unwrap();

      dispatch(
        setCredentials({
          user: {
            ...res.user,
            _id: res.user._id ?? res.user.id,
          },
          accessToken:
            res.accessToken,
          refreshToken:
            res.refreshToken,
        })
      );

      const role = res.user.role.trim().toLowerCase();
      const destination =
        roleRoutes[role as keyof typeof roleRoutes] ??
        "/farmer/dashboard";

      router.replace(destination);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F4FAF5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p:3,
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container 
          sx={{
            bgcolor: "#fff",
            borderRadius: 4,
            overflow: "hidden",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          {/* LEFT SECTION */}
     <Grid
  size={{ xs: 12, md: 5 }}
  sx={{
    background:
      "linear-gradient(180deg,#eef7ee,#dff6df)",
    p: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  }}
>

            <Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  color:
                    "primary.main",
                  mb: 3,
                }}
              >
                AgroSphere
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                Welcome Back
              </Typography>

              <Typography
                sx={{
                  color:
                    "text.secondary",
                }}
              >
                Login to access
                marketplace,
                learning,
                AI assistant,
                crop calendar,
                government
                schemes and more.
              </Typography>
            </Box>

            <Box
              component="img"
              src="/images/farmer-login.avif"
              alt="Farmer"
              sx={{
                width: "100%",
                mt: 4,
              }}
            />
          </Grid>

          {/* RIGHT SECTION */}
          <Grid
            size={{xs:12,
            md:7}}
            
          >
            <Card
              elevation={0}
              sx={{
                height: "100%",
              }}
            >
              <CardContent
                sx={{
                  p: 5,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Login
                </Typography>

                <Typography
                  sx={{
                    color:
                      "text.secondary",
                    mb: 4,
                  }}
                >
                  Access your
                  AgroSphere account
                </Typography>

                <form
                  onSubmit={handleSubmit(
                    onSubmit
                  )}
                >
                  <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    {...register(
                      "email"
                    )}
                    error={
                      !!errors.email
                    }
                    helperText={
                      errors.email
                        ?.message
                    }
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    margin="normal"
                    {...register(
                      "password"
                    )}
                    error={
                      !!errors.password
                    }
                    helperText={
                      errors.password
                        ?.message
                    }
                  />

                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    disabled={
                      isLoading
                    }
                    sx={{
                      height: 50,
                    }}
                  >
                    {isLoading
                      ? "Logging In..."
                      : "Login"}
                  </Button>

                  <Button
                    fullWidth
                    type="button"
                    variant="text"
                    onClick={() => router.push("/forgot-password")}
                    sx={{ mt: 1 }}
                  >
                    Forgot password?
                  </Button>
                </form>

                <Divider
                  sx={{
                    my: 4,
                  }}
                >
                  OR
                </Divider>

                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    mb: 2,
                  }}
                >
                  Continue with
                  Google
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                >
                  Continue with
                  Facebook
                </Button>

                <Typography
                  sx={{
                    mt: 4,
                    textAlign:
                      "center",
                  }}
                >
                  Donot have an
                  account?{" "}
                  <Box
                    component="span"
                    sx={{
                      color:
                        "primary.main",
                      cursor:
                        "pointer",
                      fontWeight: 600,
                    }}
                    onClick={() =>
                      router.push(
                        "/register"
                      )
                    }
                  >
                    Register
                  </Box>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
