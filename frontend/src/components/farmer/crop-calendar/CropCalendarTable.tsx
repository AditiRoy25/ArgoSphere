"use client";

import Link from "next/link";

import {
  Alert,
  Box,
  Chip,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AgricultureIcon from "@mui/icons-material/Agriculture";

import {
  useDeleteCropMutation,
} from "@/src/redux/api/cropCalendarApi";

import type {
  CropCalendar,
} from "@/src/types/cropCalendar";

interface Props {
  crops: CropCalendar[];
}

export default function CropCalendarTable({
  crops,
}: Props) {

  const [
    deleteCrop,
  ] =
    useDeleteCropMutation();

  // ============================
  // DELETE
  // ============================

  const handleDelete =
    async (
      id: string
    ) => {

      const ok =
        window.confirm(
          "Delete this crop schedule?"
        );

      if (!ok) return;

      try {

        await deleteCrop(
          id
        ).unwrap();

      } catch (error) {

        console.log(error);

      }

    };

  // ============================
  // EMPTY
  // ============================

  if (
    crops.length === 0
  ) {

    return (

      <Alert severity="info">

        No crop schedules found.

      </Alert>

    );

  }

  return (

    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: 4,
        border:
          "1px solid #E5E7EB",
      }}
    >

      <Table>

        {/* =====================
            HEADER
        ===================== */}

        <TableHead>

          <TableRow
            sx={{
              bgcolor:
                "#F8FAFC",
            }}
          >

            <TableCell>
              Crop
            </TableCell>

            <TableCell>
              Farm
            </TableCell>

            <TableCell>
              Area
            </TableCell>

            <TableCell>
              Soil
            </TableCell>

            <TableCell>
              Sowing
            </TableCell>

            <TableCell>
              Harvest
            </TableCell>

            <TableCell
              align="center"
            >
              Actions
            </TableCell>

          </TableRow>

        </TableHead>

        {/* =====================
            BODY
        ===================== */}

        <TableBody>

          {crops.map(
            (
              crop
            ) => (

              <TableRow
                key={
                  crop._id
                }
                hover
              >

                {/* Crop */}

                <TableCell>

                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                  >

                    <AgricultureIcon
                      color="success"
                    />

                    <Typography
                      fontWeight={
                        600
                      }
                    >
                      {
                        crop.cropName
                      }
                    </Typography>

                  </Stack>

                </TableCell>

                {/* Farm */}

                <TableCell>

                  {
                    crop.farm
                      ?.farmName
                  }

                </TableCell>

                {/* Area */}

                <TableCell>

                  <Chip
                    label={`${crop.farm?.area} Acre`}
                    color="success"
                    size="small"
                  />

                </TableCell>

                {/* Soil */}

                <TableCell>

                  {
                    crop.farm
                      ?.soilType
                  }

                </TableCell>

                {/* Sowing */}

                <TableCell>

                  {new Date(
                    crop.sowingDate
                  ).toLocaleDateString(
                    "en-IN"
                  )}

                </TableCell>

                {/* Harvest */}

                <TableCell>

                  {new Date(
                    crop.harvestDate
                  ).toLocaleDateString(
                    "en-IN"
                  )}

                </TableCell>

                {/* ACTIONS */}

                <TableCell
                  align="center"
                >

                  <Tooltip title="Edit">

                    <IconButton
                      component={
                        Link
                      }
                      href={`/farmer/crop-calendar/${crop._id}/edit`}
                      color="primary"
                    >

                      <EditIcon />

                    </IconButton>

                  </Tooltip>

                  <Tooltip title="Delete">

                    <IconButton
                      color="error"
                      onClick={() =>
                        handleDelete(
                          crop._id
                        )
                      }
                    >

                      <DeleteOutlineIcon />

                    </IconButton>

                  </Tooltip>

                </TableCell>

              </TableRow>

            )
          )}

        </TableBody>

      </Table>

    </TableContainer>

  );

}