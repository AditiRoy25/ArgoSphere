"use client";

import { useMemo, useState } from "react";

import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  useGetGovernmentSchemesQuery,
  useApplySchemeMutation,
} from "@/src/redux/api/schemeApi";

import NgoSchemeTable, {
  Scheme,
} from "@/src/components/ngo/NgoSchemeTable";

export default function NgoSchemesPage() {

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useGetGovernmentSchemesQuery();

  const [
    applyScheme,
    {
      isLoading: applying,
    },
  ] =
    useApplySchemeMutation();

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    category,
    setCategory,
  ] = useState("");

  const [
    selectedScheme,
    setSelectedScheme,
  ] =
    useState<Scheme | null>(
      null
    );

  const [
    openView,
    setOpenView,
  ] = useState(false);

  const [
    openApply,
    setOpenApply,
  ] = useState(false);

  const schemes =
    data?.schemes ??
    [];

  const filtered =
    useMemo(() => {

      return schemes.filter(
        (scheme: Scheme) => {

          const matchSearch =
            scheme.title
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchCategory =
            !category ||
            scheme.category ===
              category;

          return (
            matchSearch &&
            matchCategory
          );

        }
      );

    }, [
      schemes,
      search,
      category,
    ]);

  const handleApply =
    async () => {

      if (!selectedScheme)
        return;

      try {

        await applyScheme(
          selectedScheme._id
        ).unwrap();

        setOpenApply(
          false
        );

        refetch();

      } catch (
        error
      ) {
        console.log(
          error
        );
      }

    };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        py={10}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Container
        maxWidth="lg"
      >
        <Alert severity="error">
          Failed to load
          schemes.
        </Alert>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="xl"
      sx={{ py: 4 }}
    >
      <Stack spacing={4}>

        <Typography
          variant="h4"
          fontWeight={700}
        >
          Government Schemes
        </Typography>

        <Paper
          sx={{
            p: 3,
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
              fullWidth
              value={search}
              onChange={(
                e
              ) =>
                setSearch(
                  e.target
                    .value
                )
              }
            />

            <TextField
              select
              label="Category"
              sx={{
                minWidth: 220,
              }}
              value={
                category
              }
              onChange={(
                e
              ) =>
                setCategory(
                  e.target
                    .value
                )
              }
            >
              <MenuItem value="">
                All
              </MenuItem>

              <MenuItem value="Agriculture">
                Agriculture
              </MenuItem>

              <MenuItem value="Equipment">
                Equipment
              </MenuItem>

              <MenuItem value="Training">
                Training
              </MenuItem>

            </TextField>

          </Stack>
        </Paper>

        <NgoSchemeTable
          rows={filtered}
          loading={
            isLoading
          }
          onView={(
            scheme
          ) => {
            setSelectedScheme(
              scheme
            );

            setOpenView(
              true
            );
          }}
          onApply={(
            scheme
          ) => {
            setSelectedScheme(
              scheme
            );

            setOpenApply(
              true
            );
          }}
        />

      </Stack>

      {/* View */}

      <Dialog
        open={openView}
        onClose={() =>
          setOpenView(
            false
          )
        }
        fullWidth
        maxWidth="md"
      >

        <DialogTitle>
          Scheme Details
        </DialogTitle>

        <DialogContent>

          <Typography
            variant="h5"
            fontWeight={700}
          >
            {
              selectedScheme?.title
            }
          </Typography>

          <Typography
            mt={2}
          >
            Ministry :
            {" "}
            {
              selectedScheme?.ministry
            }
          </Typography>

          <Typography>
            Category :
            {" "}
            {
              selectedScheme?.category
            }
          </Typography>

          <Typography>
            Last Date :
            {" "}
            {
              selectedScheme?.lastDate
            }
          </Typography>

          <Chip
            sx={{
              mt: 2,
            }}
            label={
              selectedScheme?.status
            }
            color="primary"
          />

        </DialogContent>

        <DialogActions>

          <Button
            onClick={() =>
              setOpenView(
                false
              )
            }
          >
            Close
          </Button>

        </DialogActions>

      </Dialog>

      {/* Apply */}

      <Dialog
        open={openApply}
        onClose={() =>
          setOpenApply(
            false
          )
        }
      >

        <DialogTitle>
          Apply Scheme
        </DialogTitle>

        <DialogContent>

          <Typography>

            Are you sure
            you want to
            apply for

            <strong>
              {" "}
              {
                selectedScheme?.title
              }
            </strong>

            ?

          </Typography>

        </DialogContent>

        <DialogActions>

          <Button
            onClick={() =>
              setOpenApply(
                false
              )
            }
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            disabled={
              applying
            }
            onClick={
              handleApply
            }
          >
            {applying
              ? "Applying..."
              : "Apply"}
          </Button>

        </DialogActions>

      </Dialog>

    </Container>
  );
}