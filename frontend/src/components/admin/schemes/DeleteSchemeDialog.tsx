"use client";

import * as React from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

import { toast } from "sonner";

import {
  GovernmentScheme,
} from "../../../types/scheme";

import {
  useDeleteSchemeMutation,
} from "../../../redux/api/schemeApi";

interface DeleteSchemeDialogProps {
  open: boolean;

  scheme: GovernmentScheme | null;

  onClose: () => void;
}

export default function DeleteSchemeDialog({
  open,
  scheme,
  onClose,
}: DeleteSchemeDialogProps) {
  const [
    deleteScheme,
    {
      isLoading,
    },
  ] = useDeleteSchemeMutation();

  const handleDelete = async () => {
    if (!scheme) return;

    try {
      await deleteScheme(
        scheme._id
      ).unwrap();

      toast.success(
        "Scheme deleted successfully."
      );

      onClose();
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          "Failed to delete scheme."
      );
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>
        Delete Scheme
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete
          <strong>
            {" "}
            {scheme?.title}
          </strong>
          ?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          color="inherit"
        >
          Cancel
        </Button>

        <Button
          color="error"
          variant="contained"
          onClick={handleDelete}
          loading={isLoading}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}