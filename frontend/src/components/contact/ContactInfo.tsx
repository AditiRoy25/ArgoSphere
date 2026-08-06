"use client";

import {
  Paper,
  Stack,
  Typography,
  Box,
} from "@mui/material";

import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const contactDetails = [
  {
    icon: <PhoneIcon color="success" />,
    title: "Call Us",
    value: "+91 12345 67890",
  },
  {
    icon: <EmailIcon color="success" />,
    title: "Email Us",
    value: "support@agrosphere.com",
  },
  {
    icon: <LocationOnIcon color="success" />,
    title: "Visit Us",
    value: "Krishi Bhawan, New Delhi - 110001, India",
  },
  {
    icon: <AccessTimeIcon color="success" />,
    title: "Working Hours",
    value: "Mon - Sat: 9:00 AM - 6:00 PM",
  },
];

export default function ContactInfo() {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 5,
        borderRadius: 4,
        height: "100%",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: "success.main",
          mb: 1,
        }}
      >
        Get in Touch
      </Typography>

      <Box
        sx={{
          width: 60,
          height: 3,
          bgcolor: "success.main",
          mb: 5,
          borderRadius: 2,
        }}
      />

      <Stack spacing={4}>
        {contactDetails.map((item, index) => (
          <Stack
            key={index}
            direction="row"
            spacing={3}
            alignItems="flex-start"
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                bgcolor: "#E8F5E9",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              {item.icon}
            </Box>

            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 0.5,
                }}
              >
                {item.title}
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  lineHeight: 1.7,
                }}
              >
                {item.value}
              </Typography>
            </Box>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}