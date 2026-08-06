"use client";

import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";

import AgricultureIcon from "@mui/icons-material/Agriculture";
import SpaIcon from "@mui/icons-material/Spa";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import BugReportIcon from "@mui/icons-material/BugReport";
import GrassIcon from "@mui/icons-material/Grass";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import PetsIcon from "@mui/icons-material/Pets";
import StorefrontIcon from "@mui/icons-material/Storefront";

interface Props {
  category: string;

  onClick?: (
    category: string
  ) => void;
}

export default function CategoryCard({
  category,
  onClick,
}: Props) {
  // ==========================================
  // CATEGORY ICON
  // ==========================================

  const getIcon = (
    name: string
  ) => {
    switch (
      name.toLowerCase()
    ) {
      case "crop production":
        return (
          <AgricultureIcon
            sx={{
              fontSize: 36,
            }}
          />
        );

      case "soil health":
        return (
          <SpaIcon
            sx={{
              fontSize: 36,
            }}
          />
        );

      case "organic farming":
        return (
          <GrassIcon
            sx={{
              fontSize: 36,
            }}
          />
        );

      case "irrigation":
        return (
          <WaterDropIcon
            sx={{
              fontSize: 36,
            }}
          />
        );

      case "pest management":
        return (
          <BugReportIcon
            sx={{
              fontSize: 36,
            }}
          />
        );

      case "farm mechanization":
        return (
          <PrecisionManufacturingIcon
            sx={{
              fontSize: 36,
            }}
          />
        );

      case "livestock":
        return (
          <PetsIcon
            sx={{
              fontSize: 36,
            }}
          />
        );

      case "agri business":
        return (
          <StorefrontIcon
            sx={{
              fontSize: 36,
            }}
          />
        );

      default:
        return (
          <AgricultureIcon
            sx={{
              fontSize: 36,
            }}
          />
        );
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",

        minHeight: 230,

        height: "100%",

        border: "1px solid",

        borderColor:
          "divider",

        borderRadius: 4,

        overflow: "hidden",

        backgroundColor:
          "background.paper",

        transition:
          "all 0.3s ease",

        "&:hover": {
          borderColor:
            "success.main",

          transform:
            "translateY(-6px)",

          boxShadow: 5,
        },
      }}
    >
      <CardActionArea
        onClick={() =>
          onClick?.(
            category
          )
        }
        sx={{
          height: "100%",

          minHeight: 230,
        }}
      >
        <CardContent
          sx={{
            p: 3,

            minHeight: 230,

            display: "flex",

            flexDirection:
              "column",

            alignItems:
              "center",

            justifyContent:
              "center",

            textAlign:
              "center",

            gap: 2.5,

            "&:last-child": {
              pb: 3,
            },
          }}
        >
          {/* ==================================
              ICON
          ================================== */}

          <Avatar
            sx={{
              width: 80,

              height: 80,

              bgcolor:
                "success.light",

              color:
                "success.dark",
            }}
          >
            {getIcon(
              category
            )}
          </Avatar>

          {/* ==================================
              CONTENT
          ================================== */}

          <Box
            sx={{
              width: "100%",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight:
                  700,

                fontSize: 18,

                lineHeight:
                  1.3,

                color:
                  "text.primary",
              }}
            >
              {category}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color:
                  "text.secondary",

                mt: 1,

                fontSize: 14,
              }}
            >
              Explore Courses
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}