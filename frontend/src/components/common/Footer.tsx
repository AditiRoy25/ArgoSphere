"use client";

import Link from "next/link";
import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  IconButton,
  Divider,
} from "@mui/material";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

export default function Footer() {
  return (
    <Box
      sx={{
        bgcolor: "#1B5E20",
        color: "#fff",
        mt: 10,
        pt: 8,
        pb: 3,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={5}>

          {/* Company */}

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h4"
             sx={{ fontWeight:700}}
              gutterBottom
            >
              🌿 AgroSphere
            </Typography>

            <Typography
              sx={{
                opacity: .9,
                lineHeight: 1.9,
              }}
            >
              India's Digital Agriculture Platform
              connecting Farmers, NGOs,
              Agriculture Officers and
              the Ministry through one secure,
              AI-powered ecosystem.
            </Typography>

           <Box
  sx={{
    display: "flex",
    gap: 1,
    mt: 3,
  }}
>
  <IconButton color="inherit">
    <FacebookIcon />
  </IconButton>

  <IconButton color="inherit">
    <TwitterIcon />
  </IconButton>

  <IconButton color="inherit">
    <LinkedInIcon />
  </IconButton>

  <IconButton color="inherit">
    <YouTubeIcon />
  </IconButton>
</Box>
          </Grid>

          {/* Quick Links */}

          <Grid size={{ xs: 6, md: 2 }}>
            <Typography
              sx={{fontWeight:700,
              mb:2}}
            >
              Quick Links
            </Typography>

            <Stack spacing={1}>
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/marketplace">Marketplace</Link>
              <Link href="/learning">Learning</Link>
              <Link href="/contact">Contact</Link>
            </Stack>
          </Grid>

          {/* Services */}

          <Grid size={{ xs: 6, md: 3 }}>
            <Typography
             sx={{ fontWeight:700,
              mb:2}}
            >
              Services
            </Typography>

            <Stack spacing={1}>
              <Typography>AI Assistant</Typography>
              <Typography>Crop Calendar</Typography>
              <Typography>Marketplace</Typography>
              <Typography>Weather Alerts</Typography>
              <Typography>Government Schemes</Typography>
            </Stack>
          </Grid>

          {/* Contact */}

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography
             sx={{ fontWeight:700,
              mb:2}}
            >
              Contact
            </Typography>

            <Stack spacing={2}>

              <Stack direction="row" spacing={1}>
                <LocationOnIcon />
                <Typography>
                  Ministry of Agriculture,
                  New Delhi, India
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1}>
                <PhoneIcon />
                <Typography>
                  +91 9876543210
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1}>
                <EmailIcon />
                <Typography>
                  support@agrosphere.in
                </Typography>
              </Stack>

            </Stack>
          </Grid>

        </Grid>

        <Divider
          sx={{
            my: 5,
            borderColor: "rgba(255,255,255,.2)",
          }}
        />

        <Typography
          align="center"
          sx={{
            opacity: .8,
          }}
        >
          © 2026 AgroSphere.
          All Rights Reserved.
          Ministry of Agriculture &
          Farmers Welfare.
        </Typography>

      </Container>
    </Box>
  );
}