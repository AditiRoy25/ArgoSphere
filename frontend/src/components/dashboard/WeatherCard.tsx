// "use client";

// import {
//   Card,
//   CardContent,
//   Typography,
// } from "@mui/material";
// import Grid from "@mui/material/Grid";

// import { useForecastQuery } from "@/src/redux/api/weatherAlertApi";

// interface ForecastDay {
//   day: string;
//   icon: string;
//   temp: string | number;
// }

// export default function WeatherForecast() {
//   const {
//     data,
//     isLoading,
//     error,
//   } = useForecastQuery(undefined);

//   if (isLoading) {
//     return <Typography>Loading...</Typography>;
//   }

//   if (error) {
//     return <Typography>Failed to load forecast.</Typography>;
//   }

//   return (
//     <Card
//       elevation={0}
//       sx={{
//         borderRadius: 4,
//         border: "1px solid #ECECEC",
//       }}
//     >
//       <CardContent>
//         <Typography
//           variant="h6"
//           sx={{ fontWeight: 700, mb: 3 }}
//         >
//           5-Day Forecast
//         </Typography>

//         <Grid container spacing={2}>
//           {data?.forecast?.map((item: ForecastDay) => (
//             <Grid
//               key={item.day}
//               size={{ xs: 4, md: 2.4 }}
//             >
//               <Typography
//                 sx={{ textAlign: "center", fontWeight: 600 }}
//               >
//                 {item.day}
//               </Typography>

//               <Typography
//                 sx={{ textAlign: "center", mt: 1 }}
//               >
//                 {item.icon}
//               </Typography>

//               <Typography sx={{ textAlign: "center" }}>
//                 {item.temp}
//               </Typography>
//             </Grid>
//           ))}
//         </Grid>
//       </CardContent>
//     </Card>
//   );
// }
