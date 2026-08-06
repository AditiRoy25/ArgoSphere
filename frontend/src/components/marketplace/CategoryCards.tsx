"use client";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

import GrassIcon from "@mui/icons-material/Grass";
import CompostIcon from "@mui/icons-material/Compost";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import WaterIcon from "@mui/icons-material/Water";
import PestControlIcon from "@mui/icons-material/PestControl";
import BuildIcon from "@mui/icons-material/Build";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";

import type {
  ProductCategory,
} from "@/src/types/marketplace.types";

interface CategoryCardsProps {
  selectedCategory:
    | ProductCategory
    | "all";

  onCategoryChange: (
    category:
      | ProductCategory
      | "all"
  ) => void;
}

const categories: {
  name: string;
  value: ProductCategory;
  icon: React.ReactNode;
}[] = [
  {
    name: "Seeds",
    value: "seed",
    icon: <GrassIcon />,
  },

  {
    name: "Fertilizers",
    value: "fertilizer",
    icon: <CompostIcon />,
  },

  {
    name: "Tractors",
    value: "tractor",
    icon: <AgricultureIcon />,
  },

  {
    name: "Harvesters",
    value: "harvester",
    icon: (
      <PrecisionManufacturingIcon />
    ),
  },

  {
    name: "Water Pumps",
    value: "pump",
    icon: <WaterIcon />,
  },

  {
    name: "Sprayers",
    value: "sprayer",
    icon: <PestControlIcon />,
  },

  {
    name: "Farm Tools",
    value: "tool",
    icon: <BuildIcon />,
  },
];

export default function CategoryCards({
  selectedCategory,
  onCategoryChange,
}: CategoryCardsProps) {

  return (
    <Box sx={{ mb: 5 }}>

      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 1,
        }}
      >
        Shop by Category
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Browse agricultural products
        by category
      </Typography>

      <Grid
        container
        spacing={2}
      >

        {categories.map(
          (category) => {

            const selected =
              selectedCategory ===
              category.value;

            return (

              <Grid
                key={
                  category.value
                }
                size={{
                  xs: 6,
                  sm: 4,
                  md: 3,
                }}
              >

                <Card
                  elevation={0}
                  sx={{
                    height: "100%",

                    border:
                      "1px solid",

                    borderColor:
                      selected
                        ? "success.main"
                        : "divider",

                    borderRadius: 3,

                    bgcolor:
                      selected
                        ? "#F0FDF4"
                        : "#FFFFFF",

                    transition:
                      "0.2s",

                    "&:hover": {
                      borderColor:
                        "success.main",

                      transform:
                        "translateY(-3px)",

                      boxShadow:
                        "0 8px 25px rgba(0,0,0,.08)",
                    },
                  }}
                >

                  <CardActionArea
                    onClick={() =>
                      onCategoryChange(
                        category.value
                      )
                    }
                    sx={{
                      height: "100%",
                    }}
                  >

                    <CardContent
                      sx={{
                        textAlign:
                          "center",

                        py: 3,
                      }}
                    >

                      <Box
                        sx={{
                          width: 60,
                          height: 60,

                          mx: "auto",
                          mb: 1.5,

                          borderRadius:
                            "50%",

                          bgcolor:
                            "#DCFCE7",

                          color:
                            "#15803D",

                          display:
                            "flex",

                          alignItems:
                            "center",

                          justifyContent:
                            "center",

                          "& svg": {
                            fontSize: 30,
                          },
                        }}
                      >

                        {
                          category.icon
                        }

                      </Box>

                      <Typography
                        fontWeight={700}
                      >
                        {
                          category.name
                        }
                      </Typography>

                    </CardContent>

                  </CardActionArea>

                </Card>

              </Grid>

            );

          }
        )}

      </Grid>

    </Box>
  );
}