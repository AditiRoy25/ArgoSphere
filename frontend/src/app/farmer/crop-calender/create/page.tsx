"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Link from "next/link";

import {
  useGetMyFarmsQuery,
} from "@/src/redux/api/farmApi";

import {
  useCreateCropMutation,
} from "@/src/redux/api/cropCalendarApi";

export default function CreateCropPage() {

  const router = useRouter();

  // =============================
  // API
  // =============================

  const {
    data: farmData,
    isLoading: farmLoading,
  } = useGetMyFarmsQuery();

  const [
    createCrop,
    {
      isLoading,
    },
  ] = useCreateCropMutation();

  // =============================
  // FORM
  // =============================

  const [form, setForm] = useState({

    farm: "",

    cropName: "",

    sowingDate: "",

    fertilizerDate: "",

    irrigationDate: "",

    harvestDate: "",

    notes: "",

  });

  // =============================
  // CHANGE
  // =============================

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {

    setForm({

      ...form,

      [event.target.name]:
        event.target.value,

    });

  };

  // =============================
  // SUBMIT
  // =============================

  const handleSubmit = async (
    event: React.FormEvent
  ) => {

    event.preventDefault();

    try {

      await createCrop(
        form
      ).unwrap();

      router.push(
        "/farmer/crop-calendar"
      );

    }

    catch (error) {

      console.log(error);

    }

  };

  if (farmLoading) {

    return (

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 10,
        }}
      >

        <CircularProgress />

      </Box>

    );

  }

  return (

    <Container
      maxWidth="md"
      sx={{
        py: 4,
      }}
    >

      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 4,
          border:
            "1px solid #E5E7EB",
        }}
      >

        {/* Header */}

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >

          <Box>

            <Typography
              variant="h4"
              fontWeight={700}
            >

              Create Crop Schedule

            </Typography>

            <Typography
              color="text.secondary"
            >

              Plan your farming activities.

            </Typography>

          </Box>

          <Button
            component={Link}
            href="/farmer/crop-calendar"
            startIcon={
              <ArrowBackIcon />
            }
          >

            Back

          </Button>

        </Stack>

        <Box
          component="form"
          onSubmit={handleSubmit}
        >

          <Stack spacing={3}>

            {/* FARM */}

            <TextField
              select
              label="Farm"
              name="farm"
              value={form.farm}
              onChange={handleChange}
              required
            >

              {farmData?.farms.map(
                (farm) => (

                  <MenuItem
                    key={farm._id}
                    value={farm._id}
                  >

                    {farm.farmName}

                  </MenuItem>

                )
              )}

            </TextField>

            {/* Crop */}

            <TextField
              label="Crop Name"
              name="cropName"
              value={form.cropName}
              onChange={handleChange}
              required
            />

            {/* Sowing */}

            <TextField
              label="Sowing Date"
              name="sowingDate"
              type="date"
              value={
                form.sowingDate
              }
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />

            {/* Fertilizer */}

            <TextField
              label="Fertilizer Date"
              name="fertilizerDate"
              type="date"
              value={
                form.fertilizerDate
              }
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />

            {/* Irrigation */}

            <TextField
              label="Irrigation Date"
              name="irrigationDate"
              type="date"
              value={
                form.irrigationDate
              }
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />

            {/* Harvest */}

            <TextField
              label="Harvest Date"
              name="harvestDate"
              type="date"
              value={
                form.harvestDate
              }
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />

            {/* Notes */}

            <TextField
              label="Notes"
              name="notes"
              value={
                form.notes
              }
              onChange={handleChange}
              multiline
              rows={4}
            />

            <Button
              type="submit"
              variant="contained"
              color="success"
              disabled={
                isLoading
              }
              sx={{
                py: 1.5,
                fontWeight: 700,
              }}
            >

              {isLoading
                ? "Creating..."
                : "Create Crop Schedule"}

            </Button>

          </Stack>

        </Box>

      </Paper>

    </Container>

  );

}