"use client";

import {
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";

// ==========================================
// STATES
// ==========================================

const STATES = [
  "All India",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

// ==========================================
// CATEGORIES
// ==========================================

const CATEGORIES = [
  "Financial Assistance",
  "Crop Insurance",
  "Agricultural Loan",
  "Organic Farming",
  "Farm Mechanization",
  "Seed Subsidy",
  "Soil Health",
  "Irrigation",
  "Livestock",
  "Women Farmers",
];

// ==========================================
// PROPS
// ==========================================

interface Props {
  search: string;
  setSearch: (value: string) => void;

  category: string;
  setCategory: (value: string) => void;

  state: string;
  setState: (value: string) => void;

  eligibility: string;
  setEligibility: (value: string) => void;

  onSearch: () => void;

  onReset: () => void;

  loading?: boolean;
}

// ==========================================
// COMPONENT
// ==========================================

export default function SearchFilters({
  search,
  setSearch,

  category,
  setCategory,

  state,
  setState,

  eligibility,
  setEligibility,

  onSearch,
  onReset,

  loading = false,
}: Props) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack
        direction={{
          xs: "column",
          lg: "row",
        }}
        spacing={2}
      >
        {/* Search */}

        <TextField
          fullWidth
          label="Search Scheme"
          placeholder="PM Kisan..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch();
            }
          }}
        />

        {/* Category */}

        <TextField
          select
          fullWidth
          label="Category"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <MenuItem value="">
            All Categories
          </MenuItem>

          {CATEGORIES.map((item) => (
            <MenuItem
              key={item}
              value={item}
            >
              {item}
            </MenuItem>
          ))}
        </TextField>

        {/* State */}

        <TextField
          select
          fullWidth
          label="State"
          value={state}
          onChange={(e) =>
            setState(e.target.value)
          }
        >
          <MenuItem value="">
            All States
          </MenuItem>

          {STATES.map((item) => (
            <MenuItem
              key={item}
              value={item}
            >
              {item}
            </MenuItem>
          ))}
        </TextField>

        {/* Eligibility */}

        <TextField
          fullWidth
          label="Eligibility"
          placeholder="Small Farmer"
          value={eligibility}
          onChange={(e) =>
            setEligibility(
              e.target.value
            )
          }
        />

        {/* Search */}

        <Button
          variant="contained"
          color="success"
          startIcon={<SearchIcon />}
          disabled={loading}
          onClick={onSearch}
          sx={{
            minWidth: 150,
            whiteSpace: "nowrap",
          }}
        >
          {loading
            ? "Searching..."
            : "Search"}
        </Button>

        {/* Reset */}

        <Button
          variant="outlined"
          color="success"
          startIcon={<RefreshIcon />}
          onClick={onReset}
          disabled={loading}
          sx={{
            minWidth: 120,
          }}
        >
          Reset
        </Button>
      </Stack>
    </Paper>
  );
}