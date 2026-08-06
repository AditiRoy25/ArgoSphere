"use client";

import {
  Box,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";

// ==========================================
// PROPS
// ==========================================

interface PaginationBarProps {
  page: number;

  totalPages: number;

  totalItems?: number;

  onChange: (
    page: number
  ) => void;
}

// ==========================================
// COMPONENT
// ==========================================

export default function PaginationBar({
  page,

  totalPages,

  totalItems = 0,

  onChange,
}: PaginationBarProps) {
  // Hide if only one page

  if (totalPages <= 1) {
    return null;
  }

  return (
    <Box
      sx={{
        mt: 5,

        py: 3,

        borderTop: "1px solid",

        borderColor: "divider",
      }}
    >
      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        {/* LEFT */}

        <Typography
          variant="body2"
          color="text.secondary"
        >
          Showing page{" "}
          <strong>{page}</strong> of{" "}
          <strong>
            {totalPages}
          </strong>

          {" • "}

          Total Schemes{" "}
          <strong>
            {totalItems}
          </strong>
        </Typography>

        {/* PAGINATION */}

        <Pagination
          page={page}
          count={totalPages}
          color="success"
          size="large"
          shape="rounded"
          siblingCount={1}
          boundaryCount={1}
          showFirstButton
          showLastButton
          onChange={(
            _,
            value
          ) =>
            onChange(value)
          }
          sx={{
            "& .MuiPaginationItem-root":
              {
                fontWeight: 600,
              },
          }}
        />
      </Stack>
    </Box>
  );
}