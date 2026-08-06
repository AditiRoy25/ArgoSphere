"use client";

import {
  useParams,
} from "next/navigation";

import {
  Alert,
  Avatar,
  Box,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  useGetNgoByIdQuery,
  useGetNgoWorkshopsQuery,
} from "../../../redux/api/ngoApi";
import Navbar from "../../../components/common/Navbar";


export default function NgoDetailsPage() {

  const {
    id,
  } =
    useParams<{
      id: string;
    }>();


  const {
    data,
    isLoading,
    isError,
  } =
    useGetNgoByIdQuery(
      id
    );


  const {
    data:
      workshopResponse,
  } =
    useGetNgoWorkshopsQuery(
      id
    );


  const ngo =
    data?.data;


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
        maxWidth="lg"
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
    <>
      <Navbar />
      <Container
        maxWidth="lg"
        sx={{ py: 5 }}
      >

      <Paper
        sx={{
          p: 4,
          borderRadius: 4,
        }}
      >

        <Stack
          spacing={3}
        >

          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={3}
            alignItems="center"
          >

            <Avatar
              src={ngo.logo}
              sx={{
                width: 120,
                height: 120,
              }}
            />


            <Box>

              <Typography
                variant="h3"
                fontWeight={700}
              >
                {
                  ngo.organizationName
                }
              </Typography>


              {ngo
                .ministryApproval && (

                <Chip
                  sx={{ mt: 1 }}

                  label=
                    "Ministry Approved"

                  color="success"
                />
              )}

            </Box>

          </Stack>


          <Divider />


          <Box>

            <Typography
              variant="h6"
              fontWeight={700}
            >
              Registration Number
            </Typography>

            <Typography
              color=
                "text.secondary"
            >
              {
                ngo.registrationNumber
              }
            </Typography>

          </Box>


          <Box>

            <Typography
              variant="h6"
              fontWeight={700}
            >
              Address
            </Typography>

            <Typography
              color=
                "text.secondary"
            >
              {ngo.address ||
                "Not available"}
            </Typography>

          </Box>


          <Divider />


          <Box>

            <Typography
              variant="h5"
              fontWeight={700}
              mb={2}
            >
              Workshops
            </Typography>

            <pre>
              {JSON.stringify(
                workshopResponse,
                null,
                2
              )}
            </pre>

          </Box>

        </Stack>

      </Paper>

      </Container>
    </>
  );
}
