"use client";

import {
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedIcon from "@mui/icons-material/Verified";
import PaymentsIcon from "@mui/icons-material/Payments";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const features = [
  {
    title: "Fast Delivery",
    description:
      "Quick and reliable delivery across farming regions.",
    icon: <LocalShippingIcon fontSize="large" />,
  },
  {
    title: "Quality Products",
    description:
      "Certified seeds, fertilizers and agricultural equipment.",
    icon: <VerifiedIcon fontSize="large" />,
  },
  {
    title: "Secure Payments",
    description:
      "Safe online payment with trusted payment gateways.",
    icon: <PaymentsIcon fontSize="large" />,
  },
  {
    title: "24×7 Support",
    description:
      "Dedicated customer support whenever you need assistance.",
    icon: <SupportAgentIcon fontSize="large" />,
  },
];

export default function FeatureSection() {
  return (
    <Grid container spacing={3}>
      {features.map((feature) => (
        <Grid
          key={feature.title}
          size={{
            xs: 12,
            sm: 6,
            md: 3,
          }}
        >
          <Card
            sx={{
              height: "100%",
              borderRadius: 3,
              textAlign: "center",
              transition: "0.3s",
              "&:hover": {
                boxShadow: 6,
                transform: "translateY(-4px)",
              },
            }}
          >
            <CardContent>
              <Stack
                spacing={2}
                alignItems="center"
              >
                {feature.icon}

                <Typography
                  variant="h6"
                  fontWeight={700}
                >
                  {feature.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {feature.description}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}