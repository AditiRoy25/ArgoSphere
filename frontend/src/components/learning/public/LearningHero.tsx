
"use client";

import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import SchoolIcon from "@mui/icons-material/School";

import type {
  LearningStats,
} from "@/types/learning";

// ==========================================
// PROPS
// ==========================================

interface Props {
  stats?: LearningStats;

  search: string;

  onSearchChange: (
    value: string
  ) => void;

  onSearch: () => void;
}

// ==========================================
// DEFAULT STATS
// ==========================================

const defaultStats: LearningStats = {
  courses: 0,
  trainers: 0,
  learners: 0,
};

// ==========================================
// COMPONENT
// ==========================================

export default function LearningHero({
  stats = defaultStats,
  search,
  onSearch,
  onSearchChange,
}: Props) {
  return (
    <Paper
      elevation={0}
      sx={{
        overflow: "hidden",
        borderRadius: 5,
        position: "relative",
        minHeight: 420,

        backgroundImage: `
          linear-gradient(
            90deg,
            rgba(248,252,246,.98) 0%,
            rgba(248,252,246,.90) 45%,
            rgba(248,252,246,.10) 80%
          ),
          url("/images/learning/learning-banner.jpg")
        `,

        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          p: {
            xs: 3,
            md: 6,
          },

          maxWidth: 720,
        }}
      >
        {/* ==================================
            BADGE
        ================================== */}

        <Chip
          color="success"
          icon={<SchoolIcon />}
          label="Learn • Grow • Succeed"
          sx={{
            fontWeight: 700,
            mb: 2,
          }}
        />

        {/* ==================================
            TITLE
        ================================== */}

        <Typography
          component="h1"
          sx={{
            fontSize: {
              xs: 36,
              md: 54,
            },

            fontWeight: 800,

            lineHeight: 1.15,

            color: "#1b5e20",
          }}
        >
          Learn. Apply.
          <br />
          Grow.
        </Typography>

        {/* ==================================
            SUBTITLE
        ================================== */}

        <Typography
          sx={{
            mt: 1,

            color: "#2e7d32",

            fontWeight: 700,

            fontSize: {
              xs: 24,
              md: 36,
            },
          }}
        >
          Empowering Farmers Every Day
        </Typography>

        {/* ==================================
            DESCRIPTION
        ================================== */}

        <Typography
          sx={{
            mt: 3,

            color: "text.secondary",

            fontSize: 16,

            maxWidth: 560,

            lineHeight: 1.8,
          }}
        >
          Explore expert-led agricultural
          courses, practical farming guides
          and modern technologies to increase
          your productivity and income.
        </Typography>

        {/* ==================================
            SEARCH
        ================================== */}

        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          spacing={2}
          sx={{
            mt: 4,
          }}
        >
          <TextField
            fullWidth
            placeholder="Search courses..."
            value={search}
            onChange={(event) =>
              onSearchChange(
                event.target.value
              )
            }
            onKeyDown={(event) => {
              if (
                event.key === "Enter"
              ) {
                onSearch();
              }
            }}
            sx={{
              backgroundColor: "#fff",

              borderRadius: 3,

              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />

          <Button
            type="button"
            variant="contained"
            size="large"
            startIcon={
              <SearchIcon />
            }
            onClick={onSearch}
            disabled={
              !search.trim()
            }
            sx={{
              px: 5,

              whiteSpace:
                "nowrap",

              borderRadius: 3,
            }}
          >
            Search
          </Button>
        </Stack>

        {/* ==================================
            STATISTICS
        ================================== */}

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={2}
          sx={{
            mt: 5,
          }}
        >
          {/* Courses */}

          <Paper
            elevation={1}
            sx={{
              p: 2.5,

              flex: 1,

              borderRadius: 3,

              backgroundColor:
                "rgba(255,255,255,.95)",
            }}
          >
            <Typography
              sx={{
                fontWeight: 800,

                fontSize: 28,

                color:
                  "success.main",
              }}
            >
              {stats?.courses ?? 0}+
            </Typography>

            <Typography
              sx={{
                color:
                  "text.secondary",
              }}
            >
              Courses
            </Typography>
          </Paper>

          {/* Trainers */}

          <Paper
            elevation={1}
            sx={{
              p: 2.5,

              flex: 1,

              borderRadius: 3,

              backgroundColor:
                "rgba(255,255,255,.95)",
            }}
          >
            <Typography
              sx={{
                fontWeight: 800,

                fontSize: 28,

                color:
                  "success.main",
              }}
            >
              {stats?.trainers ?? 0}+
            </Typography>

            <Typography
              sx={{
                color:
                  "text.secondary",
              }}
            >
              Expert Trainers
            </Typography>
          </Paper>

          {/* Learners */}

          <Paper
            elevation={1}
            sx={{
              p: 2.5,

              flex: 1,

              borderRadius: 3,

              backgroundColor:
                "rgba(255,255,255,.95)",
            }}
          >
            <Typography
              sx={{
                fontWeight: 800,

                fontSize: 28,

                color:
                  "success.main",
              }}
            >
              {stats?.learners ?? 0}+
            </Typography>

            <Typography
              sx={{
                color:
                  "text.secondary",
              }}
            >
              Farmers Learning
            </Typography>
          </Paper>
        </Stack>
      </Box>
    </Paper>
  );
}





// "use client";

// import Link from "next/link";

// import {
//   Box,
//   Button,
//   Container,
//   Paper,
//   Stack,
//   Typography,
// } from "@mui/material";

// import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
// import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
// import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";

// export default function LearningCTA() {
//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         mt: 8,
//         overflow: "hidden",
//         borderRadius: 5,

//         background:
//           "linear-gradient(135deg,#166534 0%,#15803d 50%,#22c55e 100%)",

//         color: "#fff",
//       }}
//     >
//       <Container maxWidth="lg">
//         <Stack
//           spacing={4}
//           sx={{
//             py: {
//               xs: 6,
//               md: 8,
//             },
//             alignItems: "center",
//             textAlign: "center",
//           }}
//         >
//           <SchoolOutlinedIcon
//             sx={{
//               fontSize: 70,
//             }}
//           />

//           <Box>
//             <Typography
//               variant="h3"
//               fontWeight={800}
//             >
//               Start Your Learning Journey Today
//             </Typography>

//             <Typography
//               sx={{
//                 mt: 2,
//                 maxWidth: 700,
//                 mx: "auto",
//                 opacity: 0.9,
//                 fontSize: 18,
//                 lineHeight: 1.8,
//               }}
//             >
//               Learn modern agricultural practices,
//               improve crop productivity, discover
//               smart farming technologies and connect
//               with experts through AgroSphere Learning.
//             </Typography>
//           </Box>

//           <Stack
//             direction={{
//               xs: "column",
//               sm: "row",
//             }}
//             spacing={2}
//           >
//             <Button
//               component={Link}
//               href="/learning/courses"
//               size="large"
//               variant="contained"
//               color="inherit"
//               endIcon={
//                 <ArrowForwardRoundedIcon />
//               }
//               sx={{
//                 color: "success.main",
//                 fontWeight: 700,
//                 px: 5,
//                 py: 1.5,
//               }}
//             >
//               Browse Courses
//             </Button>

//             <Button
//               component={Link}
//               href="/community"
//               size="large"
//               variant="outlined"
//               startIcon={
//                 <Groups2OutlinedIcon />
//               }
//               sx={{
//                 borderColor: "#fff",
//                 color: "#fff",
//                 px: 5,
//                 py: 1.5,

//                 "&:hover": {
//                   borderColor: "#fff",
//                   backgroundColor:
//                     "rgba(255,255,255,.12)",
//                 },
//               }}
//             >
//               Join Community
//             </Button>
//           </Stack>

//           <Typography
//             variant="body2"
//             sx={{
//               opacity: 0.85,
//             }}
//           >
//             Trusted by thousands of farmers across India.
//           </Typography>
//         </Stack>
//       </Container>
//     </Paper>
//   );
// }