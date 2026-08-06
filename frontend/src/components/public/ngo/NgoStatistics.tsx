"use client";

import {
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import GroupsIcon from "@mui/icons-material/Groups";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PublicIcon from "@mui/icons-material/Public";

interface Props {
  totalNgos?: number;
  totalFarmers?: number;
  totalWorkshops?: number;
  totalStates?: number;
}

export default function NgoStatistics({
  totalNgos = 0,
  totalFarmers = 0,
  totalWorkshops = 0,
  totalStates = 0,
}: Props) {
  const stats = [
    {
      title: "Registered NGOs",
      value: totalNgos,
      icon: (
        <GroupsIcon
          color="primary"
          fontSize="large"
        />
      ),
    },
    {
      title: "Farmers Supported",
      value: totalFarmers,
      icon: (
        <AgricultureIcon
          color="success"
          fontSize="large"
        />
      ),
    },
    {
      title: "Workshops",
      value: totalWorkshops,
      icon: (
        <EventAvailableIcon
          color="warning"
          fontSize="large"
        />
      ),
    },
    {
      title: "States Covered",
      value: totalStates,
      icon: (
        <PublicIcon
          color="secondary"
          fontSize="large"
        />
      ),
    },
  ];

  return (
    <Container
      maxWidth="xl"
      sx={{ py: 6 }}
    >
      <Grid
        container
        spacing={3}
      >
        {stats.map((item) => (
          <Grid
            key={item.title}
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
                transition: ".3s",
                "&:hover": {
                  transform:
                    "translateY(-5px)",
                  boxShadow: 5,
                },
              }}
            >
              <CardContent>
                <Stack
                  spacing={2}
                  alignItems="center"
                >
                  {item.icon}

                  <Typography
                    variant="h4"
                    fontWeight={700}
                  >
                    {item.value.toLocaleString()}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    align="center"
                  >
                    {item.title}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}