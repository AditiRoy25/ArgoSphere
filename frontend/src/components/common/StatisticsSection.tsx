"use client";

import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
  Button,
} from "@mui/material";

const stats = [
  {
    number: "25K+",
    title: "Registered Farmers",
  },
  {
    number: "1,500+",
    title: "Verified NGOs",
  },
  {
    number: "350+",
    title: "District Coverage",
  },
  {
    number: "10K+",
    title: "Marketplace Products",
  },
];

export default function StatisticsSection() {
  return (
    <Box
      sx={{
        py: 10,
        background:
          "linear-gradient(180deg,#E8F5E9,#F8FBF8)",
      }}
    >
      <Container maxWidth="xl">

        <Typography
          variant="h3"
          sx={{fontWeight:700,
          textAlign:"center"}}
        >
          Trusted Across
          <Box
            component="span"
            color="primary.main"
          >
            {" "}India
          </Box>
        </Typography>

        <Typography
         sx={{ textAlign:"center",
          color:"text.secondary",
          mt:2,
          mb:6}}
        >
          Connecting Farmers, NGOs, Officers and
          Ministry through one digital ecosystem.
        </Typography>

        <Grid
          container
          spacing={4}
        >
          {stats.map((item) => (
            <Grid
              key={item.title}
              size={{
                xs:12,
                sm:6,
                md:3
              }}
            >
              <Card
                sx={{
                  textAlign:"center",
                  borderRadius:5,
                  boxShadow:
                  "0 8px 20px rgba(0,0,0,.06)",

                  transition:".3s",

                  "&:hover":{
                    transform:"translateY(-8px)"
                  }
                }}
              >
                <CardContent>

                  <Typography
                    variant="h3"
                   sx={{ color:"primary",
                    fontWeight:700}}
                  >
                    {item.number}
                  </Typography>

                  <Typography
                   sx={{ mt:1,
                    color:"text.secondary"}}
                  >
                    {item.title}
                  </Typography>

                </CardContent>
              </Card>

            </Grid>
          ))}
        </Grid>

        <Card
          sx={{
            mt:10,
            borderRadius:6,
            overflow:"hidden",
            background:
            "linear-gradient(135deg,#2E7D32,#43A047)",
            color:"#fff",
          }}
        >

          <Grid
            container
            sx={{alignItems:"center"}}
          >

            <Grid
              size={{
                xs:12,
                md:7
              }}
            >

              <Box sx={{p:7}}>

                <Typography
                  variant="h3"
                 sx={{ fontWeight:700}}
                >
                  Ministry Supported
                  Agriculture Platform
                </Typography>

                <Typography
                 
                  sx={{
                     mt:3,
                    opacity:.9,
                    lineHeight:1.8
                  }}
                >
                  AgroSphere helps farmers
                  access government schemes,
                  AI advisory services,
                  marketplace facilities,
                  weather forecasts,
                  crop calendars,
                  learning resources
                  and NGO support
                  from one secure platform.
                </Typography>

              <Stack
  direction="row"
  spacing={3} // Space between buttons
  sx={{ mt: 4 }}
>
  <Button
    variant="contained"
    color="inherit"
    size="medium"
    sx={{
      px: 3,
      py: 1,
      fontSize: "0.9rem",
      borderRadius: 2,
      textTransform: "none",
      minWidth: 150,
    }}
  >
    Explore Schemes
  </Button>

  <Button
    variant="outlined"
    size="medium"
    sx={{
      color: "#fff",
      borderColor: "#fff",
      px: 3,
      py: 1,
      fontSize: "0.9rem",
      borderRadius: 2,
      textTransform: "none",
      minWidth: 150,
      "&:hover": {
        borderColor: "#fff",
        bgcolor: "rgba(255,255,255,0.1)",
      },
    }}
  >
    Learn More
  </Button>
</Stack>

              </Box>

            </Grid>

            <Grid
              size={{
                xs:12,
                md:5
              }}
            >

              <Box
                component="img"
                src="/images/ras1.png"
                alt="Ministry"
                sx={{
                  width:"100%",
                  height:"100%",
                  objectFit:"cover",
                  display:"block"
                }}
              />

            </Grid>

          </Grid>

        </Card>

      </Container>
    </Box>
  );
}