"use client";

import Navbar from "@/src/components/common/Navbar";
import Footer from "@/src/components/common/Footer";

import ContactForm from "@/src/components/contact/ContactForm";
import ContactInfo from "@/src/components/contact/ContactInfo";

import {
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <Box
        sx={{
          py: {
            xs: 6,
            md: 10,
          },
          bgcolor: "#fafafa",
        }}
      >
        <Container maxWidth="xl">
          <Grid
            container
            spacing={6}
            alignItems="flex-start"
          >
            {/* Left Side */}
            <Grid
              size={{
                xs: 12,
                lg: 7,
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                Contact Us
              </Typography>

              <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                  mb: 5,
                  maxWidth: 600,
                  lineHeight: 1.7,
                }}
              >
                We'd love to hear from you. Fill out
                the form and we'll get back to you as
                soon as possible.
              </Typography>

              <ContactForm />
            </Grid>

            {/* Right Side */}
            <Grid
              size={{
                xs: 12,
                lg: 5,
              }}
            >
              <ContactInfo />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Footer />
    </>
  );
}