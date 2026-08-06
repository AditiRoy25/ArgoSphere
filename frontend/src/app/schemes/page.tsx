"use client";

import { useMemo, useState } from "react";

import {
  Box,
  Container,
  Stack,
} from "@mui/material";

import Navbar from "@/src/components/common/Navbar";

import HeroSection from "@/src/components/schemes/SchemeHeroSection";
import SearchFilters from "@/src/components/schemes/SearchFilters";
import SchemeStats from "@/src/components/schemes/SchemeStats";
import SchemeList from "@/src/components/schemes/SchemeList";
import PaginationBar from "@/src/components/schemes/PaginationBar";

import {
  useApplySchemeMutation,
  useGetSchemesQuery,
  useMySchemesQuery,
} from "@/src/redux/api/schemeApi";

import { useSelector } from "react-redux";
import type { RootState } from "@/src/redux/store";

export default function SchemesPage() {

  // ======================================
  // USER
  // ======================================

  const user = useSelector(
    (state: RootState) => state.auth.user
  );

  const isLoggedIn = !!user;

  const isFarmer =
    user?.role === "farmer";

  // ======================================
  // FILTERS
  // ======================================

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [state, setState] =
    useState("");

  const [
    eligibility,
    setEligibility,
  ] = useState("");

  const [
    appliedSearch,
    setAppliedSearch,
  ] = useState("");

  // ======================================
  // PAGINATION
  // ======================================

  const [page, setPage] =
    useState(1);

  const limit = 6;

  // ======================================
  // SCHEMES
  // ======================================

  const {
    data,
    isLoading,
    isFetching,
    isError,
  } = useGetSchemesQuery({
    search:
      appliedSearch || undefined,

    category:
      category || undefined,

    state:
      state || undefined,

    eligibility:
      eligibility || undefined,

    page,

    limit,
  });
console.log("data:", data);
console.log("isError:", isError);

  // ======================================
  // MY APPLICATIONS
  // ======================================

  const {
    data: mySchemes,
  } = useMySchemesQuery(undefined, {
    skip: !isFarmer,
  });

  // ======================================
  // APPLY
  // ======================================

  const [
    applyScheme,
    {
      isLoading:
        applying,
    },
  ] =
    useApplySchemeMutation();

  const [
    applyingSchemeId,
    setApplyingSchemeId,
  ] =
    useState<string | null>(
      null
    );

  // ======================================
  // APPLIED IDS
  // ======================================

  const appliedSchemeIds =
    useMemo(() => {

      return new Set(

        mySchemes?.applications.map(
          (item) =>
            item.scheme._id
        ) ?? []

      );

    }, [mySchemes]);

  // ======================================
  // APPLY
  // ======================================

  const handleApply =
    async (
      schemeId: string
    ) => {

      if (
        appliedSchemeIds.has(
          schemeId
        )
      ) {
        return;
      }

      try {

        setApplyingSchemeId(
          schemeId
        );

        await applyScheme({
          schemeId,
        }).unwrap();

      } catch (error) {

        console.log(error);

      } finally {

        setApplyingSchemeId(
          null
        );

      }
    };

  // ======================================
  // SEARCH
  // ======================================

  const handleSearch =
    () => {

      setPage(1);

      setAppliedSearch(
        search.trim()
      );

    };

  // ======================================
  // RESET
  // ======================================

  const handleReset =
    () => {

      setSearch("");

      setCategory("");

      setState("");

      setEligibility("");

      setAppliedSearch("");

      setPage(1);

    };

  return (

    <>
      <Navbar />

      <Box
        sx={{
          py: 5,
        }}
      >
        <Container
          maxWidth="xl"
        >
          <Stack
            spacing={4}
          >
            <HeroSection />

            <SearchFilters
              search={search}
              setSearch={
                setSearch
              }

              category={
                category
              }
              setCategory={
                setCategory
              }

              state={state}
              setState={
                setState
              }

              eligibility={
                eligibility
              }
              setEligibility={
                setEligibility
              }

              onSearch={
                handleSearch
              }

              onReset={
                handleReset
              }

              loading={
                isFetching
              }
            />

            {/* <SchemeStats
              totalSchemes={
                data?.pagination
                  ?.total ?? 0
              }

              centralSchemes={
                data?.schemes.filter(
                  (item) =>
                    item.state ===
                    "All India"
                ).length ?? 0
              }

              stateSchemes={
                data?.schemes.filter(
                  (item) =>
                    item.state !==
                    "All India"
                ).length ?? 0
              }

              eligibleSchemes={
                data?.schemes
                  ?.length ?? 0
              }
            /> */}

            <SchemeStats
  totalSchemes={
    data?.pagination?.total ??
    0
  }
  centralSchemes={
    data?.schemes?.filter(
      (scheme) =>
        scheme.state === "All India"
    ).length ?? 0
  }
  stateSchemes={
    data?.schemes?.filter(
      (scheme) =>
        scheme.state !== "All India"
    ).length ?? 0
  }
  eligibleSchemes={
    data?.schemes?.length ?? 0
  }
/>

            <SchemeList
              schemes={
                data?.schemes ??
                []
              }

              loading={
                isLoading ||
                isFetching
              }

              error={
                isError
              }

              isLoggedIn={
                isLoggedIn
              }

              isFarmer={
                isFarmer
              }

              appliedSchemeIds={
                appliedSchemeIds
              }

              applyingSchemeId={
                applying
                  ? applyingSchemeId
                  : null
              }

              onApply={
                handleApply
              }
            />

            {/* <PaginationBar
              page={
                data?.pagination
                  ?.page ?? page
              }

              totalPages={
                data?.pagination
                  ?.totalPages ??
                1
              }

              totalItems={
                data?.pagination
                  ?.total ?? 0
              }

              onChange={
                setPage
              }
            /> */}

<PaginationBar
  page={
    data?.pagination?.page ??
    page
  }
  totalPages={
    data?.pagination
      ?.totalPages ?? 1
  }
  totalItems={
    data?.pagination
      ?.total ?? 0
  }
  onChange={setPage}
/>


            
          </Stack>
        </Container>
      </Box>
    </>
  );
}