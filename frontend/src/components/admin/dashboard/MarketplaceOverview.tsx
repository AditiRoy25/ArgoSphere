"use client";

import Grid from "@mui/material/Grid";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Avatar,
} from "@mui/material";

import GrassRoundedIcon from "@mui/icons-material/GrassRounded";
import ScienceRoundedIcon from "@mui/icons-material/ScienceRounded";
import AgricultureRoundedIcon from "@mui/icons-material/AgricultureRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";

interface MarketplaceStats {
  totalSeeds: number;
  totalFertilizers: number;
  totalEquipments: number;
  totalOrders: number;
}

interface Props {
  data?: MarketplaceStats;
}

export default function MarketplaceOverview({
  data,
}: Props) {
  const marketplaceData = [
    {
      title: "Seeds",
      value: data?.totalSeeds ?? 0,
      subtitle: "Products",
      icon: <GrassRoundedIcon />,
      color: "#4CAF50",
    },
    {
      title: "Fertilizers",
      value: data?.totalFertilizers ?? 0,
      subtitle: "Products",
      icon: <ScienceRoundedIcon />,
      color: "#FB8C00",
    },
    {
      title: "Equipment",
      value: data?.totalEquipments ?? 0,
      subtitle: "Products",
      icon: <AgricultureRoundedIcon />,
      color: "#1976D2",
    },
    {
      title: "Orders",
      value: data?.totalOrders ?? 0,
      subtitle: "Completed",
      icon: <ShoppingCartRoundedIcon />,
      color: "#8E24AA",
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
      <CardContent>
        <Typography
          variant="h6"
       sx={{   fontWeight:700,
          mb:3}}
        >
          Marketplace Overview
        </Typography>

        <Grid container spacing={2}>
          {marketplaceData.map((item) => (
            <Grid
              key={item.title}
              size={{ xs: 12, sm: 6 }}
            >
              <Card
                variant="outlined"
                sx={{
                  borderRadius: 3,
                  transition: ".3s",
                  "&:hover": {
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent>
                  <Stack
                  sx={{  direction:"row",
                    justifyContent:"space-between",
                    alignItems:"center"}}
                  >
                    <Stack spacing={1}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {item.title}
                      </Typography>

                      <Typography
                        variant="h4"
                       sx={{ fontWeight:700}}
                      >
                        {item.value}
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        {item.subtitle}
                      </Typography>
                    </Stack>

                    <Avatar
                      sx={{
                        bgcolor: item.color,
                        width: 52,
                        height: 52,
                      }}
                    >
                      {item.icon}
                    </Avatar>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}