"use client";

import * as React from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

import { toast } from "sonner";

import SchemeForm from "./SchemeForm";

import {
  CreateSchemePayload,
} from "../../../types/scheme";

import {
  useCreateSchemeMutation,
} from "../../../redux/api/schemeApi";

interface AddSchemeDialogProps {
  open: boolean;

  onClose: () => void;
}

export default function AddSchemeDialog({
  open,
  onClose,
}: AddSchemeDialogProps) {
  const [
    createScheme,
    {
      isLoading,
    },
  ] = useCreateSchemeMutation();

  const handleSubmit = async (
    values: CreateSchemePayload
  ) => {
    try {
      await createScheme(
        values
      ).unwrap();

      toast.success(
        "Scheme created successfully."
      );

      onClose();
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          "Failed to create scheme."
      );
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        Add Government Scheme
      </DialogTitle>

      <DialogContent dividers>
        <SchemeForm
          loading={isLoading}
          onSubmit={handleSubmit}
        />
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          color="inherit"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}