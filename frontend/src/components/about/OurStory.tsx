"use client";

import {
  Box,
  // Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

export default function AboutHero() {
  return (
   <Box
  sx={{
    py: 10,
    bgcolor: "#F8FBF8",
  }}
>
  <Container maxWidth="xl">
    <Grid
      container
     sx={{ spacing:6,
      alignItems:"center"}}
    >
      {/* Left Side */}

      <Grid size={{ xs: 12, md: 6 }}>
        <Typography
          sx={{
            color: "primary.main",
            fontWeight: 700,
            mb: 2,
          }}
        >
          OUR STORY
        </Typography>

        <Typography
          variant="h3"
         sx={{ fontWeight:700,
          mb:3}}
        >
          Transforming Agriculture
          Through Innovation
        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            lineHeight: 2,
            mb: 4,
          }}
        >
          AgroSphere was created with a vision to
          digitally connect farmers, NGOs,
          agriculture officers and the Ministry
          of Agriculture on one secure platform.

          Our mission is to improve farming through
          AI-powered advisory, smart marketplaces,
          weather intelligence, crop management,
          government schemes and digital learning.
        </Typography>

        <Stack spacing={3}>

          <Stack direction="row" spacing={2}>
            ✅
            <Typography>
              AI-powered Agriculture Support
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2}>
            ✅
            <Typography>
              Government Scheme Integration
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2}>
            ✅
            <Typography>
              Sustainable Smart Farming
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2}>
            ✅
            <Typography>
              Learning & Marketplace
            </Typography>
          </Stack>

        </Stack>
      </Grid>

      {/* Right Side */}

      <Grid size={{ xs: 12, md: 6 }}>
        <Box
          sx={{
            position: "relative",
          }}
        >
          <Box
            component="img"
            src="/images/images2.jpg"
            alt="Farmer"
            sx={{
              width: "100%",
              borderRadius: 5,
            }}
          />

          <Paper
            elevation={6}
            sx={{
              position: "absolute",
              bottom: 25,
              left: 25,
              p: 3,
              borderRadius: 4,
            }}
          >
            <Typography
              variant="h5"
             sx={{ fontWeight:700,
              color:"primary"}}
            >
              25K+
            </Typography>

            <Typography>
              Farmers Connected
            </Typography>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  </Container>
</Box>
  );
}