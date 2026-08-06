"use client";

import Link from "next/link";

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import HelpOutlineIcon from "@mui/icons-material/HelpOutlineRounded";

export default function HelpCard() {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid #E5E7EB",
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: "center", mb: 3 }}
        >
          <SupportAgentIcon
            color="success"
            sx={{ fontSize: 40 }}
          />

          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700 }}
            >
              Need Help?
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Contact AgroSphere Support anytime.
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        <Stack spacing={2}>
          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: "center" }}
          >
            <PhoneIcon color="primary" />

            <Box>
              <Typography sx={{ fontWeight: 600 }}>
                Helpline
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                +91 1800-123-4567
              </Typography>
            </Box>
          </Stack>

          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: "center" }}
          >
            <EmailIcon color="error" />

            <Box>
              <Typography sx={{ fontWeight: 600 }}>
                Email Support
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                support@agrosphere.com
              </Typography>
            </Box>
          </Stack>

          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: "center" }}
          >
            <WhatsAppIcon
              sx={{ color: "#25D366" }}
            />

            <Box>
              <Typography sx={{ fontWeight: 600 }}>
                WhatsApp
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                +91 98765 43210
              </Typography>
            </Box>
          </Stack>

          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: "center" }}
          >
            <HelpOutlineIcon color="action" />

            <Box>
              <Typography sx={{ fontWeight: 600 }}>
                FAQ Center
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Find answers to common farming questions.
              </Typography>
            </Box>
          </Stack>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={2}
        >
          <Button
            fullWidth
            variant="contained"
            component={Link}
            href="/contact"
          >
            Contact Support
          </Button>

          <Button
            fullWidth
            variant="outlined"
            component={Link}
            href="/faq"
          >
            Visit FAQ
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
