"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Avatar,
  Container,
} from "@mui/material";

import {
  Visibility,
  VisibilityOff,
  CloudUpload,
} from "@mui/icons-material";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  registerSchema,
  RegisterFormData,
} from "../../../validations/register.schema";

import { useRegisterMutation } from "../../../redux/api/authApi";

const roles = [
  "farmer",
  "ngo",
  "officer",
  "ministry",
];

export default function RegisterPage() {
  const router = useRouter();

  const [registerUser, { isLoading }] =
    useRegisterMutation();

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [selectedRole, setSelectedRole] =
    useState("farmer");

  const [image, setImage] =
    useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver:
      zodResolver(registerSchema),
       defaultValues: {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    // role:""
  },
  });

 const onSubmit = async (data: RegisterFormData) => {
  try {
    console.log("1. Submit clicked",data);

    const res = await registerUser({
      ...data,
      role: selectedRole,
      image,
    }).unwrap();

    console.log("2. API Success", res);

    console.log("3. Redirecting...");
    router.push("/verify-email");

    console.log("4. router.push called");
  } catch (error) {
    console.log("Register Error:", error);
  }
};

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#f7faf7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
       <Container maxWidth="lg">
      <Grid
        container
      
        sx={{
          background: "#fff",
          borderRadius: 5,
          overflow: "hidden",
          boxShadow:
            "0 10px 30px rgba(0,0,0,.08)",
        }}
      >
        {/* LEFT SIDE */}
        <Grid
          size={{ xs: 12, md: 5 }}
          sx={{
            background:
              "linear-gradient(to bottom,#eef7ee,#d9f3d9)",
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
    fontWeight: "bold",
    color: "primary.main",
    mb: 3,
  }}
>
  Join AgroSphere
</Typography>
            <Typography
              variant="h5"

              
             sx={{ fontWeight:"600",
              mb:2}}
            >
              Empowering Farmers,
              Growing Futures
            </Typography>

            <Typography color="text.secondary">
              Create your account and
              access agriculture tools,
              marketplace, learning,
              and more.
            </Typography>
          </Box>

          <Box
            component="img"
            src="/images/farmer.png"
            alt="farmer"
            sx={{
              width: "100%",
              maxHeight: 500,
              objectFit: "contain",
            }}
          />
        </Grid>

        {/* RIGHT SIDE */}
        <Grid
          size={{ xs: 12, md: 7 }}
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
               sx={{ fontWeight:"700"}}
              >
                Create Account
              </Typography>

              <Typography
               sx={{ color:"text.secondary",
                mb:4}}
              >
                Sign up to get started
              </Typography>

              {/* ROLES */}
             <Grid
  container
  spacing={2}
  sx={{
    mb: 4,
  }}
>
                {roles.map((role) => (
                  <Grid
                    size={{
                      xs: 6,
                      sm: 3,
                    }}
                    key={role}
                  >
                    <Card
                      onClick={() =>
                        setSelectedRole(
                          role
                        )
                      }
                      sx={{
                        cursor:
                          "pointer",
                        border:
                          selectedRole ===
                          role
                            ? "2px solid #15803d"
                            : "1px solid #ddd",
                        textAlign:
                          "center",
                        py: 2,
                      }}
                    >
                      <Typography
                       sx={{ textTransform:"capitalize"}}
                      >
                        {role}
                      </Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <form
                onSubmit={handleSubmit(
                  onSubmit,
                  (errors) => {
      console.log(errors);
    }
                )}
              >
                <TextField
                  label="Full Name"
                  {...register("name")}
                  error={
                    !!errors.name
                  }
                  helperText={
                    errors.name
                      ?.message
                  }
                />

                <TextField
                  label="Email"
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
                  label="Phone"
                  {...register(
                    "phone"
                  )}
                  error={
                    !!errors.phone
                  }
                  helperText={
                    errors.phone
                      ?.message
                  }
                />

                {/* IMAGE */}
                <Button
                  component="label"
                  startIcon={
                    <CloudUpload />
                  }
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  Upload Image

                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={(
                      e
                    ) =>
                      setImage(
                        e.target
                          .files?.[0] ||
                          null
                      )
                    }
                  />
                </Button>

                {image && (
                  <Avatar
                    src={URL.createObjectURL(
                      image
                    )}
                    sx={{
                      width: 70,
                      height: 70,
                      mb: 2,
                    }}
                  />
                )}

              <TextField
  fullWidth
  label="Password"
  type={showPassword ? "text" : "password"}
  {...register("password")}
  error={!!errors.password}
  helperText={errors.password?.message}
  slotProps={{
    input: {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            onClick={() =>
              setShowPassword(!showPassword)
            }
            edge="end"
          >
            {showPassword ? (
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

              <TextField
  fullWidth
  label="Confirm Password"
  type={
    showConfirmPassword
      ? "text"
      : "password"
  }
  {...register("confirmPassword")}
  error={!!errors.confirmPassword}
  helperText={
    errors.confirmPassword?.message
  }
  slotProps={{
    input: {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            edge="end"
            onClick={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
          >
            {showConfirmPassword ? (
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
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={
                    isLoading
                  }
                  sx={{
                    mt: 2,
                  }}
                >
                  {isLoading
                    ? "Creating..."
                    : "Create Account"}
                </Button>
              </form>

              <Typography
                sx={{mt:3,
                textAlign:"center"}}
              >
                Already have an
                account?{" "}
                <span
                  style={{
                    color:
                      "#15803d",
                    cursor:
                      "pointer",
                  }}
                  onClick={() =>
                    router.push(
                      "/login"
                    )
                  }
                >
                  Login
                </span>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      </Container>
    </Box>
  );
}