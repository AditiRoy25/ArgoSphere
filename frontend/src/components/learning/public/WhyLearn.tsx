"use client";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import EmojiObjectsOutlinedIcon from "@mui/icons-material/EmojiObjectsOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

export default function WhyLearn() {
  const features = [
    {
      title: "Expert Trainers",
      description:
        "Learn from agriculture experts, researchers and experienced farmers.",
      icon: <EmojiObjectsOutlinedIcon />,
    },
    {
      title: "Flexible Learning",
      description:
        "Access lessons anytime from your mobile, tablet or computer.",
      icon: <AccessTimeOutlinedIcon />,
    },
    {
      title: "Certificates",
      description:
        "Receive certificates after completing eligible learning programs.",
      icon: <WorkspacePremiumOutlinedIcon />,
    },
    {
      title: "Farmer Community",
      description:
        "Connect with thousands of farmers and share knowledge.",
      icon: <GroupsOutlinedIcon />,
    },
  ];

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        height: "100%",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="h5"
          fontWeight={700}
          mb={1}
        >
          Why Learn with AgroSphere?
        </Typography>

        <Typography
          color="text.secondary"
          mb={4}
        >
          Improve your farming knowledge through
          practical, expert-led learning designed
          for modern agriculture.
        </Typography>

        <Stack spacing={3}>
          {features.map((feature, index) => (
            <Box key={feature.title}>
              <Stack
                direction="row"
                spacing={2}
                alignItems="flex-start"
              >
                <Avatar
                  sx={{
                    bgcolor: "success.light",
                    color: "success.dark",
                    width: 52,
                    height: 52,
                  }}
                >
                  {feature.icon}
                </Avatar>

                <Box>
                  <Typography
                    fontWeight={700}
                    mb={0.5}
                  >
                    {feature.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    lineHeight={1.8}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              </Stack>

              {index !== features.length - 1 && (
                <Divider sx={{ mt: 3 }} />
              )}
            </Box>
          ))}
        </Stack>

        {/* Bottom Banner */}

        <Box
          sx={{
            mt: 4,
            borderRadius: 3,
            bgcolor: "success.main",
            color: "#fff",
            p: 3,
          }}
        >
          <Typography
            variant="h6"
            fontWeight={700}
            gutterBottom
          >
            Ready to Grow?
          </Typography>

          <Typography
            variant="body2"
            sx={{
              opacity: 0.9,
            }}
          >
            Start learning today and become a
            smarter, more productive farmer with
            AgroSphere Learning.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}