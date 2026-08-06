"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import {
  Box,
  Button,
  CircularProgress,
  Container,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
  useGetCropQuery,
  useUpdateCropMutation,
} from "@/src/redux/api/cropCalendarApi";

import {
  useGetMyFarmsQuery,
} from "@/src/redux/api/farmApi";

export default function EditCropPage() {

  const params = useParams();

  const router = useRouter();

  const cropId = params.id as string;

  // =====================================
  // API
  // =====================================

  const {
    data: cropData,
    isLoading,
    isError,
  } = useGetCropQuery(cropId);

  const {
    data: farmData,
  } = useGetMyFarmsQuery();

  const [
    updateCrop,
    {
      isLoading: updating,
    },
  ] = useUpdateCropMutation();

  // =====================================
  // FORM
  // =====================================

  const [form, setForm] = useState({

    farm: "",

    cropName: "",

    sowingDate: "",

    fertilizerDate: "",

    irrigationDate: "",

    harvestDate: "",

    notes: "",

  });

  // =====================================
  // PREFILL
  // =====================================

  useEffect(() => {

    if (!cropData?.crop) return;

    const crop =
      cropData.crop;

    setForm({

      farm:
        crop.farm._id,

      cropName:
        crop.cropName,

      sowingDate:
        crop.sowingDate
          ?.substring(0, 10),

      fertilizerDate:
        crop.fertilizerDate
          ?.substring(0, 10) ||
        "",

      irrigationDate:
        crop.irrigationDate
          ?.substring(0, 10) ||
        "",

      harvestDate:
        crop.harvestDate
          ?.substring(0, 10),

      notes:
        crop.notes || "",

    });

  }, [cropData]);

  // =====================================
  // CHANGE
  // =====================================

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {

    setForm({

      ...form,

      [event.target.name]:
        event.target.value,

    });

  };

  // =====================================
  // SUBMIT
  // =====================================

  const handleSubmit = async (
    event: React.FormEvent
  ) => {

    event.preventDefault();

    try {

      await updateCrop({

        id: cropId,

        body: form,

      }).unwrap();

      router.push(
        "/farmer/crop-calendar"
      );

    } catch (error) {

      console.log(error);

    }

  };

  // =====================================
  // LOADING
  // =====================================

  if (isLoading) {

    return (

      <Box
        sx={{
          py: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >

        <CircularProgress />

      </Box>

    );

  }

  // =====================================
  // ERROR
  // =====================================

  if (isError) {

    return (

      <Container>

        <Alert severity="error">

          Crop Schedule not found.

        </Alert>

      </Container>

    );

  }

  // =====================================
  // PAGE
  // =====================================

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

              Edit Crop Schedule

            </Typography>

            <Typography
              color="text.secondary"
            >

              Update crop information.

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

            {/* CROP */}

            <TextField
              label="Crop Name"
              name="cropName"
              value={form.cropName}
              onChange={handleChange}
            />

            {/* SOWING */}

            <TextField
              type="date"
              label="Sowing Date"
              name="sowingDate"
              value={form.sowingDate}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />

            {/* FERTILIZER */}

            <TextField
              type="date"
              label="Fertilizer Date"
              name="fertilizerDate"
              value={form.fertilizerDate}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />

            {/* IRRIGATION */}

            <TextField
              type="date"
              label="Irrigation Date"
              name="irrigationDate"
              value={form.irrigationDate}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />

            {/* HARVEST */}

            <TextField
              type="date"
              label="Harvest Date"
              name="harvestDate"
              value={form.harvestDate}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />

            {/* NOTES */}

            <TextField
              multiline
              rows={4}
              label="Notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
            />

            <Button
              type="submit"
              variant="contained"
              color="success"
              disabled={updating}
              sx={{
                py: 1.5,
                fontWeight: 700,
              }}
            >

              {updating
                ? "Updating..."
                : "Update Crop Schedule"}

            </Button>

          </Stack>

        </Box>

      </Paper>

    </Container>

  );

}