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
  GovernmentScheme,
  CreateSchemePayload,
} from "../../../types/scheme";

import {
  useUpdateSchemeMutation,
} from "../../../redux/api/schemeApi";

interface EditSchemeDialogProps {
  open: boolean;

  scheme: GovernmentScheme | null;

  onClose: () => void;
}

export default function EditSchemeDialog({
  open,
  scheme,
  onClose,
}: EditSchemeDialogProps) {
  const [
    updateScheme,
    {
      isLoading,
    },
  ] = useUpdateSchemeMutation();

  const handleSubmit = async (
    values: CreateSchemePayload
  ) => {
    if (!scheme) return;

    try {
      await updateScheme({
        id: scheme._id,
        body: values,
      }).unwrap();

      toast.success(
        "Scheme updated successfully."
      );

      onClose();
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          "Failed to update scheme."
      );
    }
  };

  if (!scheme) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        Edit Government Scheme
      </DialogTitle>

      <DialogContent dividers>
        <SchemeForm
          loading={isLoading}
          defaultValues={{
            title: scheme.title,
            description: scheme.description,
            amount: scheme.amount,
            eligibility: scheme.eligibility,
            lastDate: scheme.lastDate,
            status: scheme.status,
            image: scheme.image,
          }}
          onSubmit={handleSubmit}
        />
      </DialogContent>

      <DialogActions>
        <Button
          color="inherit"
          onClick={onClose}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}