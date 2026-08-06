"use client";

import {
  Avatar,
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

import VisibilityIcon from "@mui/icons-material/Visibility";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import type { IFarmer } from "@/src/types/farmer.types";

interface FarmerTableProps {
  farmers: IFarmer[];
  onView: (id: string) => void;
  onBlock: (id: string) => void;
  onUnblock: (id: string) => void;
}

export default function FarmerTable({
  farmers,
  onView,
  onBlock,
  onUnblock,
}: FarmerTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>

        <TableHead>
          <TableRow>
            <TableCell>Farmer</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Verified</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {farmers.map((farmer) => (
            <TableRow key={farmer._id} hover>

              <TableCell>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                >
                  <Avatar
                    src={farmer.profileImage}
                    alt={farmer.name}
                  />

                  <Typography>
                    {farmer.name}
                  </Typography>
                </Stack>
              </TableCell>

              <TableCell>
                {farmer.email}
              </TableCell>

              <TableCell>
                {farmer.phone}
              </TableCell>

              <TableCell>
                {farmer.role}
              </TableCell>

              <TableCell>
                <Chip
                  color={
                    farmer.isVerified
                      ? "success"
                      : "warning"
                  }
                  label={
                    farmer.isVerified
                      ? "Verified"
                      : "Pending"
                  }
                  size="small"
                />
              </TableCell>

              <TableCell>
                <Chip
                  color={
                    farmer.isBlocked
                      ? "error"
                      : "success"
                  }
                  label={
                    farmer.isBlocked
                      ? "Blocked"
                      : "Active"
                  }
                  size="small"
                />
              </TableCell>

              <TableCell align="center">

                <Tooltip title="View">
                  <IconButton
                    onClick={() =>
                      onView(farmer._id)
                    }
                  >
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>

                {farmer.isBlocked ? (
                  <Tooltip title="Unblock">
                    <IconButton
                      color="success"
                      onClick={() =>
                        onUnblock(farmer._id)
                      }
                    >
                      <CheckCircleIcon />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Block">
                    <IconButton
                      color="error"
                      onClick={() =>
                        onBlock(farmer._id)
                      }
                    >
                      <BlockIcon />
                    </IconButton>
                  </Tooltip>
                )}

              </TableCell>

            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
}