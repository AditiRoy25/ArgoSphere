"use client";

import * as React from "react";

import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";

import {
  Box,
  Button,
  Divider,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";

import {
  ProductCategory,
  ProductStatus,
} from "@/types/marketplace.types";

interface FilterDrawerProps {
  open: boolean;

  onClose: () => void;

  category: ProductCategory | "";

  status: ProductStatus | "";

  sort: string;

  onCategoryChange: (
    value: ProductCategory | ""
  ) => void;

  onStatusChange: (
    value: ProductStatus | ""
  ) => void;

  onSortChange: (
    value: string
  ) => void;

  onReset: () => void;
}

export default function FilterDrawer({
  open,
  onClose,
  category,
  status,
  sort,
  onCategoryChange,
  onStatusChange,
  onSortChange,
  onReset,
}: FilterDrawerProps) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
    >
      <Box
        sx={{
          width: 320,
          p: 3,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h6"
            fontWeight={700}
          >
            Filters
          </Typography>

          <Button
            onClick={onClose}
            minWidth={40}
          >
            <CloseIcon />
          </Button>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Stack spacing={3}>
          <FormControl fullWidth>
            <InputLabel>
              Category
            </InputLabel>

            <Select
              value={category}
              label="Category"
              onChange={(e) =>
                onCategoryChange(
                  e.target.value as ProductCategory | ""
                )
              }
            >
              <MenuItem value="">
                All
              </MenuItem>

              <MenuItem value="seed">
                Seed
              </MenuItem>

              <MenuItem value="fertilizer">
                Fertilizer
              </MenuItem>

              <MenuItem value="tractor">
                Tractor
              </MenuItem>

              <MenuItem value="harvester">
                Harvester
              </MenuItem>

              <MenuItem value="pump">
                Pump
              </MenuItem>

              <MenuItem value="sprayer">
                Sprayer
              </MenuItem>

              <MenuItem value="tool">
                Tool
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>
              Status
            </InputLabel>

            <Select
              value={status}
              label="Status"
              onChange={(e) =>
                onStatusChange(
                  e.target.value as ProductStatus | ""
                )
              }
            >
              <MenuItem value="">
                All
              </MenuItem>

              <MenuItem value="available">
                Available
              </MenuItem>

              <MenuItem value="out_of_stock">
                Out of Stock
              </MenuItem>

              <MenuItem value="inactive">
                Inactive
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>
              Sort By
            </InputLabel>

            <Select
              value={sort}
              label="Sort By"
              onChange={(e) =>
                onSortChange(
                  e.target.value
                )
              }
            >
              <MenuItem value="">
                Default
              </MenuItem>

              <MenuItem value="priceAsc">
                Price Low → High
              </MenuItem>

              <MenuItem value="priceDesc">
                Price High → Low
              </MenuItem>

              <MenuItem value="nameAsc">
                Name A → Z
              </MenuItem>

              <MenuItem value="nameDesc">
                Name Z → A
              </MenuItem>

              <MenuItem value="newest">
                Newest
              </MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            color="inherit"
            onClick={onReset}
          >
            Reset Filters
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
}