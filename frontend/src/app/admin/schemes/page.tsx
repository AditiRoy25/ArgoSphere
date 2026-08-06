"use client";

import * as React from "react";

import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { GovernmentScheme } from "../../../types/scheme";

import {
  useGetSchemesQuery,
} from "../../../redux/api/schemeApi";

import SchemeTable from "../../../components/admin/schemes/SchemeTable";
import AddSchemeDialog from "../../../components/admin/schemes/AddSchemeDialog";
import EditSchemeDialog from "../../../components/admin/schemes/EditSchemeDialog";
import DeleteSchemeDialog from "../../../components/admin/schemes/DeleteSchemeDialog";

export default function SchemesPage() {
  const [search, setSearch] =
    React.useState("");

  const [status, setStatus] =
    React.useState("");

  const [addOpen, setAddOpen] =
    React.useState(false);

  const [editOpen, setEditOpen] =
    React.useState(false);

  const [deleteOpen, setDeleteOpen] =
    React.useState(false);

  const [selectedScheme, setSelectedScheme] =
    React.useState<GovernmentScheme | null>(
      null
    );

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useGetSchemesQuery({
    search,
    status,
  });

  const schemes = React.useMemo(() => {
    return data?.schemes ?? [];
  }, [data]);

  const handleView = (
    scheme: GovernmentScheme
  ) => {
    console.log(scheme);
  };

  const handleEdit = (
    scheme: GovernmentScheme
  ) => {
    setSelectedScheme(scheme);
    setEditOpen(true);
  };

  const handleDelete = (
    scheme: GovernmentScheme
  ) => {
    setSelectedScheme(scheme);
    setDeleteOpen(true);
  };

  return (
    <Box>

      <Stack
       sx={{ direction:"row",
        justifyContent:"space-between",
        alignItems:"center",
        mb:3}}
      >
        <Typography
          variant="h4"
          sx={{fontWeight:700}}
        >
          Government Schemes
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() =>
            setAddOpen(true)
          }
        >
          Add Scheme
        </Button>
      </Stack>

      <Paper
        sx={{
          p: 3,
          mb: 3,
        }}
      >
        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          spacing={2}
        >
          <TextField
            label="Search Scheme"
            value={search}
            fullWidth
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

          <TextField
            select
            label="Status"
            value={status}
            sx={{
              width: 180,
            }}
            onChange={(e) =>
              setStatus(
                e.target.value
              )
            }
          >
            <MenuItem value="">
              All
            </MenuItem>

            <MenuItem value="Active">
              Active
            </MenuItem>

            <MenuItem value="Closed">
              Closed
            </MenuItem>
          </TextField>

          <Button
            variant="outlined"
            onClick={refetch}
          >
            Refresh
          </Button>
        </Stack>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <SchemeTable
          rows={schemes}
          loading={isLoading}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Paper>

      <AddSchemeDialog
        open={addOpen}
        onClose={() =>
          setAddOpen(false)
        }
      />

      <EditSchemeDialog
        open={editOpen}
        scheme={selectedScheme}
        onClose={() => {
          setEditOpen(false);
          setSelectedScheme(null);
        }}
      />

      <DeleteSchemeDialog
        open={deleteOpen}
        scheme={selectedScheme}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedScheme(null);
        }}
      />

      {isError && (
        <Typography
          color="error"
          sx={{mt:2}}
        >
          Failed to load schemes.
        </Typography>
      )}

    </Box>
  );
}