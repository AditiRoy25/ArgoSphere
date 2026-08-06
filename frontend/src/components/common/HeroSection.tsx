"use client";

import {
  Box,
  Grid,
  Typography,
  Button,
  Paper,
  Avatar,
  Stack,
  Container,
} from "@mui/material";

export default function HeroSection() {
  return (
    <Box
      sx={{
        bgcolor: "#F7FBF8",
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          sx={{spacing:5,
          alignItems:"center"}}
        >
          <Grid
            size={{ xs: 12, md: 6 }}
          >
            <Typography
              sx={{
                bgcolor: "#E8F5E9",
                display: "inline-block",
                px: 2,
                py: 1,
                borderRadius: 5,
                fontWeight: 600,
                mb: 3,
              }}
            >
              🌱 Empowering Farmers,
              Building India
            </Typography>

            <Typography
              variant="h2"
              sx={{fontWeight:700}}
            >
              India's Smart{" "}
              <Box
                component="span"
                color="primary.main"
              >
                Agriculture
              </Box>
              <br />
              Platform
            </Typography>

            <Typography
              sx={{
                mt: 3,
                color: "text.secondary",
                fontSize: 18,
                lineHeight: 1.8,
              }}
            >
              AgroSphere connects
              farmers, NGOs,
              Government and
              Ministry through AI,
              marketplace,
              learning and smart
              farming tools.
            </Typography>

            <Stack
              sx={{direction:"row",
              spacing:2,
              mt:2}}
            >
              <Button
                variant="contained"
                size="large"
              >
                Get Started
              </Button>

              <Button
                variant="outlined"
                size="large"
              >
                Explore Marketplace
              </Button>
            </Stack>

            {/* <Stack
             sx={{ direction:"row",
              spacing:2,
              mt:5,
              alignItems:"center"}}
            >
              <Avatar />

              <Avatar />

              <Avatar />

              <Typography
                color="text.secondary"
              >
                <strong>
                  25K+
                </strong>{" "}
                Farmers & NGOs
              </Typography>
            </Stack> */}
          </Grid>

          <Grid
            size={{ xs: 12, md: 6 }}
          >
            <Box
              sx={{
                position: "relative",
              }}
            >
              <Box
  sx={{
    width: "100%",
    height: 620,
    borderRadius: 5,
    backgroundImage: `
      linear-gradient(
        90deg,
        rgba(247,251,248,1) 0%,
        rgba(247,251,248,.95) 18%,
        rgba(247,251,248,.75) 35%,
        rgba(247,251,248,.35) 55%,
        rgba(247,251,248,0) 75%
      ),
      url('/images/ai-generated.jpeg')
    `,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
  }}
>
  <Paper
    elevation={5}
    sx={{
      position: "absolute",
      right: 20,
      bottom: 20,
      p: 2,
      borderRadius: 3,
    }}
  >
    <Typography variant="h5">
      ☀️ 28°C
    </Typography>

    <Typography color="text.secondary">
      Partly Cloudy
    </Typography>

    <Typography color="primary">
      Mumbai, India
    </Typography>
  </Paper>
</Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}