// "use client";

import { Box } from "@mui/material";

// import {
//   Box,
//   Breadcrumbs,
//   Link,
//   Stack,
//   Typography,
// } from "@mui/material";

// import NavigateNextIcon from "@mui/icons-material/NavigateNext";

// export default function HeroSection() {
//   return (
//     <Box
//       sx={{
//         borderRadius: 4,
//         overflow: "hidden",
//         position: "relative",
//         minHeight: 220,
//         px: {
//           xs: 3,
//           md: 6,
//         },
//         py: {
//           xs: 5,
//           md: 6,
//         },
//         display: "flex",
//         alignItems: "center",
//         backgroundImage:
//           "url('/images/scheme-banner.png')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       {/* Overlay */}
//       <Box
//         sx={{
//           position: "absolute",
//           inset: 0,
//           background:
//             "linear-gradient(90deg, rgba(255,255,255,.95) 30%, rgba(255,255,255,.45) 100%)",
//         }}
//       />

//       <Stack
//         spacing={2}
//         sx={{
//           position: "relative",
//           zIndex: 2,
//           maxWidth: 650,
//         }}
//       >
//         <Breadcrumbs
//           separator={
//             <NavigateNextIcon
//               fontSize="small"
//             />
//           }
//         >
//           <Link
//             href="/"
//             underline="hover"
//             color="inherit"
//           >
//             Home
//           </Link>

//           <Typography color="primary">
//             Government Schemes
//           </Typography>
//         </Breadcrumbs>

//         <Typography
//           variant="h3"
//           sx={{fontWeight:700}}
//         >
//           Government Schemes
//         </Typography>

//         <Typography
//           variant="h6"
//           color="text.secondary"
//         >
//           Explore Central and State Government
//           schemes, subsidies and financial
//           assistance programs available for
//           farmers across India.
//         </Typography>
//       </Stack>
//     </Box>
//   );
// }


export default function HeroSection() {
  return (
    <Box
      component="img"
      src="/images/scheme-banner.png"
      alt="AgroSphere Hero"
      sx={{
        width: "100%",
        height: "auto",
        display: "block",
      }}
    />
  );
}