"use client";

import { useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
} from "@mui/material";

interface SearchBarProps {
  onSearch: (value: string) => void;
}

export default function SearchBar({
  onSearch,
}: SearchBarProps) {
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    onSearch(keyword.trim());
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        width: "100%",
        alignItems: "center",
      }}
    >
      <TextField
        fullWidth
        value={keyword}
        placeholder="Search products..."
        onChange={(e) =>
          setKeyword(e.target.value)
        }
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />

      <Button
        variant="contained"
        onClick={handleSearch}
        sx={{
          minWidth: 130,
          height: 56,
        }}
      >
        Search
      </Button>
    </Box>
  );
}