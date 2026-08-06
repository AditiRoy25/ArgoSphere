"use client";

import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

import AgricultureIcon from "@mui/icons-material/Agriculture";
import GrassIcon from "@mui/icons-material/Grass";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import BuildIcon from "@mui/icons-material/Build";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ScienceIcon from "@mui/icons-material/Science";

import { ProductCategory } from "../../types/marketplace.types";

interface CategorySidebarProps {
  selectedCategory: ProductCategory | "";
  onCategoryChange: (
    category: ProductCategory | ""
  ) => void;
}

const categories: {
  label: string;
  value: ProductCategory | "";
  icon: React.ReactNode;
}[] = [
  {
    label: "All Categories",
    value: "",
    icon: <AgricultureIcon />,
  },
  {
    label: "Seeds",
    value: "seed",
    icon: <GrassIcon />,
  },
  {
    label: "Fertilizers",
    value: "fertilizer",
    icon: <ScienceIcon />,
  },
  {
    label: "Pumps",
    value: "pump",
    icon: <WaterDropIcon />,
  },
  {
    label: "Sprayers",
    value: "sprayer",
    icon: <BuildIcon />,
  },
  {
    label: "Tractors",
    value: "tractor",
    icon: <LocalShippingIcon />,
  },
  {
    label: "Harvesters",
    value: "harvester",
    icon: <PrecisionManufacturingIcon />,
  },
  {
    label: "Tools",
    value: "tool",
    icon: <BuildIcon />,
  },
];

export default function CategorySidebar({
  selectedCategory,
  onCategoryChange,
}: CategorySidebarProps) {
  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: 3,
        p: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{fontWeight:700,
        mb:2}}
      >
        Categories
      </Typography>

      <List disablePadding>
        {categories.map((category) => (
          <ListItemButton
            key={category.label}
            selected={
              selectedCategory ===
              category.value
            }
            onClick={() =>
              onCategoryChange(
                category.value
              )
            }
            sx={{
              borderRadius: 2,
              mb: 1,
            }}
          >
            <ListItemIcon>
              {category.icon}
            </ListItemIcon>

            <ListItemText
              primary={category.label}
            />
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );
}