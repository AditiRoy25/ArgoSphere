"use client";

import { useState } from "react";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import {
  useGetMyWorkshopsQuery,
} from "@/src/redux/api/ngoApi";

import NgoWorkshopTable, {
  Workshop,
} from "@/src/components/ngo/NgoWorkshopTable";

export default function NgoWorkshopsPage() {

  const {
    data,
    isLoading,
    isError,
  } = useGetMyWorkshopsQuery();

  const workshops =
    data?.workshops ??
    [];

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    selectedWorkshop,
    setSelectedWorkshop,
  ] =
    useState<Workshop | null>(
      null
    );

  const [
    openView,
    setOpenView,
  ] = useState(false);

  const [
    openDelete,
    setOpenDelete,
  ] = useState(false);

  const filtered =
    workshops.filter(
      (item: Workshop) =>
        item.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

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
      <Container maxWidth="lg">
        <Alert severity="error">
          Failed to load
          workshops.
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

        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          justifyContent="space-between"
          spacing={2}
        >
          <Typography
            variant="h4"
            fontWeight={700}
          >
            My Workshops
          </Typography>

          <Button
            variant="contained"
            startIcon={
              <AddIcon />
            }
          >
            Create Workshop
          </Button>
        </Stack>

        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
          }}
        >
          <TextField
            fullWidth
            label="Search Workshop"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />
        </Paper>

        <NgoWorkshopTable
          rows={filtered}
          loading={isLoading}
          onView={(
            workshop
          ) => {
            setSelectedWorkshop(
              workshop
            );

            setOpenView(
              true
            );
          }}
          onEdit={(
            workshop
          ) => {
            console.log(
              workshop
            );
          }}
          onDelete={(
            workshop
          ) => {
            setSelectedWorkshop(
              workshop
            );

            setOpenDelete(
              true
            );
          }}
        />

      </Stack>

      {/* View Dialog */}

      <Dialog
        open={openView}
        onClose={() =>
          setOpenView(false)
        }
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Workshop Details
        </DialogTitle>

        <DialogContent>

          <Typography
            variant="h6"
          >
            {
              selectedWorkshop?.title
            }
          </Typography>

          <Typography>
            Location :
            {" "}
            {
              selectedWorkshop?.location
            }
          </Typography>

          <Typography>
            Date :
            {" "}
            {
              selectedWorkshop?.date
            }
          </Typography>

          <Typography>
            Participants :
            {" "}
            {
              selectedWorkshop?.participants
            }
          </Typography>

          <Typography>
            Status :
            {" "}
            {
              selectedWorkshop?.status
            }
          </Typography>

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

      {/* Delete Dialog */}

      <Dialog
        open={openDelete}
        onClose={() =>
          setOpenDelete(
            false
          )
        }
      >
        <DialogTitle>
          Delete Workshop
        </DialogTitle>

        <DialogContent>

          <Typography>
            Are you sure you
            want to delete
            this workshop?
          </Typography>

        </DialogContent>

        <DialogActions>

          <Button
            onClick={() =>
              setOpenDelete(
                false
              )
            }
          >
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
          >
            Delete
          </Button>

        </DialogActions>
      </Dialog>

    </Container>
  );
}