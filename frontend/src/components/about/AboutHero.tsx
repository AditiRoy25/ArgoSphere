"use client";

import {
  Box,
  Container,
  Grid,
//   Paper,
  Typography,
} from "@mui/material";

export default function OurStory() {
  return (
    <Box
  sx={{
    py: 8,
    background:
      "linear-gradient(to right,#fff 30%,transparent), url('/images/ras1.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: 6,
    overflow: "hidden",
    position: "relative",
  }}
>
  <Container maxWidth="xl">
    <Grid
      container
     sx={{ alignItems:"center"}}
    >
      {/* LEFT */}

      <Grid
        size={{ xs: 12, md: 5 }}
      >
        <Typography
        sx={{  color:"primary",
          fontWeight:700}}
        >
          ABOUT AGROSPHERE
        </Typography>

        <Typography
          variant="h2"
          sx={{fontWeight:700,
          mt:2}}
        >
          About{" "}
          <Box
            component="span"
            color="primary.main"
          >
            AgroSphere
          </Box>
        </Typography>

        <Typography
         sx={{ mt:3,
          lineHeight:2}}
        >
          AgroSphere is a digital
          platform dedicated to
          empowering farmers by
          connecting them with
          modern tools,
          marketplaces and
          government schemes.
        </Typography>
      </Grid>

      {/* RIGHT EMPTY */}

      <Grid
        size={{ xs: 12, md: 7 }}
      />
    </Grid>
  </Container>

  {/* Floating Card */}

  {/* <Paper
    sx={{
      position: "absolute",
      right: 60,
      top: "50%",
      transform:
        "translateY(-50%)",
      p: 4,
      borderRadius: 5,
      width: 350,
    }}
  >
    Ministry Card
  </Paper> */}
</Box>
  );
}