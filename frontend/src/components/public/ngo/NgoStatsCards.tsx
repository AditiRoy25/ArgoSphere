"use client";

import {
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

interface Props {
  totalWorkshops: number;
  totalBeneficiaries: number;
  totalReports: number;
  totalDonations: number;
}

export default function NgoStatsCards({
  totalWorkshops,
  totalBeneficiaries,
  totalReports,
  totalDonations,
}: Props) {
  const stats = [
    {
      title: "Workshops",
      value: totalWorkshops,
    },
    {
      title: "Beneficiaries",
      value: totalBeneficiaries,
    },
    {
      title: "Reports",
      value: totalReports,
    },
    {
      title: "Donations",
      value: totalDonations,
    },
  ];

  return (
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
            }}
          >
            <CardContent>
              <Typography
                color="text.secondary"
                fontSize={14}
              >
                {item.title}
              </Typography>

              <Typography
                variant="h4"
                fontWeight={700}
                mt={1}
              >
                {item.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}