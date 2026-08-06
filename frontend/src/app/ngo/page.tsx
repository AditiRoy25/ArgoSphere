"use client";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";

import {
  useMemo,
  useState,
} from "react";

import Navbar from "@/src/components/common/Navbar";

import NgoHero from "@/src/components/public/ngo/NgoHero";

import NgoFilters from "@/src/components/public/ngo/NgoFilters";

import NgoGrid from "@/src/components/public/ngo/NgoGrid";

import {
  useGetNgosQuery,
} from "@/src/redux/api/ngoApi";

export default function NgoPage() {

  const [search, setSearch] =
    useState("");

  const [
    approvedOnly,
    setApprovedOnly,
  ] = useState(false);

  // ============================
  // API
  // ============================

  const {
    data,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useGetNgosQuery({
    page: 1,
    limit: 50,
  });

  // ============================
  // NGO DATA
  // ============================

  const ngos =
    data?.data ?? [];

  // ============================
  // FILTER
  // ============================

  const filteredNgos =
    useMemo(() => {

      const keyword =
        search
          .trim()
          .toLowerCase();

      return ngos.filter(
        (ngo) => {

          const matchesSearch =
            !keyword ||
            ngo.organizationName
              ?.toLowerCase()
              .includes(keyword) ||
            ngo.registrationNumber
              ?.toLowerCase()
              .includes(keyword) ||
            ngo.address
              ?.toLowerCase()
              .includes(keyword);

          const matchesApproval =
            !approvedOnly ||
            ngo.ministryApproval ===
              true;

          return (
            matchesSearch &&
            matchesApproval
          );
        }
      );

    }, [
      ngos,
      search,
      approvedOnly,
    ]);

  return (
    <>
      {/* ==========================
          NAVBAR
      ========================== */}

      <Navbar />

      {/* ==========================
          HERO
      ========================== */}

      <NgoHero />

      {/* ==========================
          MAIN
      ========================== */}

      <Box
        sx={{
          bgcolor: "#f7faf7",
          minHeight: "70vh",
          py: {
            xs: 4,
            md: 7,
          },
        }}
      >
        <Container maxWidth="xl">

          <Stack spacing={4}>

            {/* =====================
                SECTION TITLE
            ===================== */}

            <Box>
              <Typography
                variant="h4"
                fontWeight={800}
                sx={{
                  color: "#17351f",
                }}
              >
                Explore NGOs
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  mt: 1,
                  maxWidth: 650,
                }}
              >
                Discover verified
                organizations working
                with farmers and rural
                communities across
                India.
              </Typography>
            </Box>

            {/* =====================
                FILTERS
            ===================== */}

            <NgoFilters
              search={search}
              approvedOnly={
                approvedOnly
              }
              onSearchChange={
                setSearch
              }
              onApprovedChange={
                setApprovedOnly
              }
              onReset={() => {
                setSearch("");
                setApprovedOnly(
                  false
                );
              }}
            />

            {/* =====================
                ERROR
            ===================== */}

            {isError && (
              <Alert
                severity="error"
                action={
                  <Button
                    color="inherit"
                    onClick={() =>
                      refetch()
                    }
                  >
                    Retry
                  </Button>
                }
              >
                Unable to load NGOs.
              </Alert>
            )}

            {/* =====================
                LOADING
            ===================== */}

            {isLoading ? (

              <Box
                sx={{
                  minHeight: 300,
                  display: "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                }}
              >
                <CircularProgress />
              </Box>

            ) : !isError &&
              filteredNgos.length ===
                0 ? (

              /* ===================
                  EMPTY
              =================== */

              <Box
                sx={{
                  bgcolor: "#fff",
                  borderRadius: 4,
                  border:
                    "1px solid #e4ebe5",
                  minHeight: 280,
                  display: "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  textAlign:
                    "center",
                  px: 3,
                }}
              >
                <Stack
                  spacing={2}
                  alignItems="center"
                >
                  <Typography
                    variant="h5"
                    fontWeight={700}
                  >
                    No NGOs Found
                  </Typography>

                  <Typography
                    color="text.secondary"
                  >
                    Try changing your
                    search or approval
                    filter.
                  </Typography>

                  <Button
                    variant="contained"
                    startIcon={
                      <RefreshIcon />
                    }
                    onClick={() => {
                      setSearch("");
                      setApprovedOnly(
                        false
                      );
                      refetch();
                    }}
                  >
                    Reset & Refresh
                  </Button>
                </Stack>
              </Box>

            ) : (

              <NgoGrid
                ngos={filteredNgos}
              />

            )}

            {isFetching &&
              !isLoading && (
                <Box
                  display="flex"
                  justifyContent="center"
                >
                  <CircularProgress
                    size={22}
                  />
                </Box>
              )}

          </Stack>
        </Container>
      </Box>
    </>
  );
}