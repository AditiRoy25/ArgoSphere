"use client";

import {
  Button,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";

import {
  Controller,
  useForm,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import {
  contactSchema,
  ContactFormData,
} from "@/src/validations/contactValidation";

import { useSendContactMutation } from "@/src/redux/api/contactApi";

const subjects = [
  "General Inquiry",
  "Marketplace Support",
  "Seeds",
  "Fertilizers",
  "Equipment",
  "NGO Partnership",
  "Technical Support",
];

export default function ContactForm() {
  const [sendContact, { isLoading }] =
    useSendContactMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),

    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (
    data: ContactFormData
  ) => {
    try {
      const res = await sendContact(data).unwrap();

      toast.success(
        res.message ||
          "Message sent successfully."
      );

      reset();
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          "Failed to send message."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack spacing={3}>
        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          spacing={3}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Your Name"
                error={!!errors.name}
                helperText={
                  errors.name?.message
                }
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="email"
                label="Your Email"
                error={!!errors.email}
                helperText={
                  errors.email?.message
                }
              />
            )}
          />
        </Stack>

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Phone Number"
              error={!!errors.phone}
              helperText={
                errors.phone?.message
              }
            />
          )}
        />

        <Controller
          name="subject"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              fullWidth
              label="Subject"
              error={!!errors.subject}
              helperText={
                errors.subject?.message
              }
            >
              {subjects.map(
                (subject) => (
                  <MenuItem
                    key={subject}
                    value={subject}
                  >
                    {subject}
                  </MenuItem>
                )
              )}
            </TextField>
          )}
        />

        <Controller
          name="message"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              multiline
              rows={6}
              label="Your Message"
              error={!!errors.message}
              helperText={
                errors.message?.message
              }
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isLoading}
          startIcon={<SendIcon />}
          sx={{
            width: {
              xs: "100%",
              sm: 250,
            },
            py: 1.5,
            borderRadius: 2,
          }}
        >
          {isLoading
            ? "Sending..."
            : "Send Message"}
        </Button>
      </Stack>
    </form>
  );
}