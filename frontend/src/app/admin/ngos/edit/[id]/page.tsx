"use client";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";

import NgoForm from
  "../../../../../components/admin/ngo/NgoForm";

import {
  useGetNgoByIdQuery,
  useUpdateNgoMutation,
} from "../../../../../redux/api/ngoApi";

import type {
  INgo,
} from "../../../../../types/ngo.types";


export default function EditNgoPage() {

  const router =
    useRouter();

  const params =
    useParams<{
      id: string;
    }>();

  const id =
    params.id;


  const {
    data,
    isLoading,
    isError,
  } =
    useGetNgoByIdQuery(
      id
    );


  const [
    updateNgo,
    {
      isLoading:
        updating,
    },
  ] =
    useUpdateNgoMutation();


  const ngo =
    data?.data;


  const handleSubmit =
    async (
      values:
        Partial<INgo>
    ) => {

      try {

        await updateNgo({
          id,

          body: values,
        }).unwrap();


        router.push(
          "/admin/ngos"
        );

      } catch (error) {

        console.error(
          "Update NGO:",
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


  if (
    isError ||
    !ngo
  ) {

    return (
      <Container
        maxWidth="md"
      >
        <Alert
          severity="error"
        >
          NGO not found.
        </Alert>
      </Container>
    );
  }


  return (
    <Container
      maxWidth="md"
      sx={{ py: 4 }}
    >

      <Typography
        variant="h4"
        fontWeight={700}
        mb={3}
      >
        Edit NGO
      </Typography>


      <NgoForm
        defaultValues={
          ngo
        }

        loading={
          updating
        }

        onSubmit={
          handleSubmit
        }
      />

    </Container>
  );
}