"use client";

import {
  Box,
  Button,
  InputAdornment,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import VerifiedIcon from "@mui/icons-material/Verified";

interface Props {

  search: string;

  approvedOnly: boolean;

  onSearchChange:
    (value: string) => void;

  onApprovedChange:
    (value: boolean) => void;

  onReset: () => void;
}

export default function NgoFilters({
  search,
  approvedOnly,
  onSearchChange,
  onApprovedChange,
  onReset,
}: Props) {

  return (
    <Paper
      elevation={0}
      sx={{
        p: {
          xs: 2,
          md: 2.5,
        },

        borderRadius: 4,

        border:
          "1px solid #e1e8e2",

        boxShadow:
          "0 8px 30px rgba(0,0,0,0.04)",
      }}
    >
      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        spacing={2}
        alignItems={{
          xs: "stretch",
          md: "center",
        }}
      >
        {/* SEARCH */}

        <TextField
          fullWidth
          value={search}
          placeholder={
            "Search by NGO name, registration number or location..."
          }
          onChange={(e) =>
            onSearchChange(
              e.target.value
            )
          }
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    color="action"
                  />
                </InputAdornment>
              ),
            },
          }}
        />

        {/* APPROVED */}

        <Box
          sx={{
            minWidth: 190,

            display: "flex",

            alignItems: "center",

            px: 1,
          }}
        >
          <VerifiedIcon
            color="success"
            sx={{ mr: 0.5 }}
          />

          <Switch
            checked={
              approvedOnly
            }
            onChange={(e) =>
              onApprovedChange(
                e.target.checked
              )
            }
            color="success"
          />

          <Typography
            variant="body2"
            fontWeight={600}
          >
            Approved Only
          </Typography>
        </Box>

        {/* RESET */}

        <Button
          variant="outlined"
          startIcon={
            <RestartAltIcon />
          }
          onClick={onReset}
          sx={{
            minWidth: 110,
            height: 55,
          }}
        >
          Reset
        </Button>
      </Stack>
    </Paper>
  );
}