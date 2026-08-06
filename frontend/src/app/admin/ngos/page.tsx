"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import RefreshIcon from
  "@mui/icons-material/Refresh";

import NgoTable from
  "../../../components/admin/ngo/NgoTable";

import NgoFilters, {
  NgoFilterValues,
} from
  "../../../components/admin/ngo/NgoFilters";

import NgoDetailsDialog from
  "../../../components/admin/ngo/NgoDetailsDialog";

import BlockNgoDialog from
  "../../../components/admin/ngo/BlockNgoDialog";

import {
  useApproveNgoMutation,
  useDeleteNgoMutation,
  useGetNgosQuery,
} from "../../../redux/api/ngoApi";

import {
  useBlockUserMutation,
  useUnblockUserMutation,
  // useBlockNgoMutation,
  // useUnblockNgoMutation,
} from "../../../redux/api/adminApi";

import type {
  INgo,
} from "../../../types/ngo.types";

import type {
  IUser,
} from "../../../types/user.types";


export default function NgoManagementPage() {

  const router =
    useRouter();


  // =====================================
  // FILTERS
  // =====================================

  const [
    filters,
    setFilters,
  ] =
    useState<NgoFilterValues>({
      search: "",
      status: "",
      verified: "",
    });


  // =====================================
  // DIALOG STATES
  // =====================================

  const [
    selectedNgo,
    setSelectedNgo,
  ] =
    useState<INgo | null>(
      null
    );

  const [
    detailsOpen,
    setDetailsOpen,
  ] =
    useState(false);

  const [
    blockDialogOpen,
    setBlockDialogOpen,
  ] =
    useState(false);


  // =====================================
  // GET NGOs
  // =====================================

  const {
    data,
    isLoading,
    isError,
    refetch,
  } =
    useGetNgosQuery({
      page: 1,
      limit: 100,
    });


  // =====================================
  // MUTATIONS
  // =====================================

  const [
    approveNgo,
    {
      isLoading:
        approving,
    },
  ] =
    useApproveNgoMutation();


  const [
    deleteNgo,
    {
      isLoading:
        deleting,
    },
  ] =
    useDeleteNgoMutation();


  const [
    blockUser,
    {
      isLoading:
        blocking,
    },
  ] =
    useBlockUserMutation();


  const [
    unblockUser,
    {
      isLoading:
        unblocking,
    },
  ] =
    useUnblockUserMutation();

  const [blockNgo] = useBlockUserMutation();
  const [unblockNgo] = useUnblockUserMutation();


  // =====================================
  // DATA
  // =====================================

  const ngos: INgo[] =
    data?.data ?? [];


  // =====================================
  // USER HELPER
  // =====================================

  const getUser = (
    ngo: INgo
  ): IUser | null => {

    if (
      typeof ngo.user ===
      "string"
    ) {
      return null;
    }

    return ngo.user;
  };


  const getUserId = (
    ngo: INgo
  ): string | null => {

    if (
      typeof ngo.user ===
      "string"
    ) {
      return ngo.user;
    }

    return ngo.user?._id ?? null;
  };


  // =====================================
  // FILTER NGOs
  // =====================================

  const filteredNgos =
    useMemo(() => {

      return ngos.filter(
        (ngo) => {

          const user =
            getUser(ngo);

          const search =
            filters.search
              .trim()
              .toLowerCase();


          const matchSearch =
            !search ||
            ngo.organizationName
              ?.toLowerCase()
              .includes(search) ||
            user?.name
              ?.toLowerCase()
              .includes(search) ||
            user?.email
              ?.toLowerCase()
              .includes(search);


          const isBlocked =
            ngo.isBlocked ??
            false;


          const isVerified =
            user?.isVerified ??
            false;


          const matchStatus =
            !filters.status ||
            (
              filters.status ===
              "blocked"
                ? isBlocked
                : !isBlocked
            );


          const matchVerified =
            !filters.verified ||
            (
              filters.verified ===
              "true"
                ? isVerified
                : !isVerified
            );


          return (
            matchSearch &&
            matchStatus &&
            matchVerified
          );
        }
      );

    }, [
      ngos,
      filters,
    ]);


  // =====================================
  // VIEW
  // =====================================

  const handleView = (
    id: string
  ) => {

    const ngo =
      ngos.find(
        (item) =>
          item._id === id
      ) ?? null;

    setSelectedNgo(ngo);

    setDetailsOpen(true);
  };


  // =====================================
  // EDIT
  // =====================================

  const handleEdit = (
    id: string
  ) => {

    router.push(
      `/admin/ngos/edit/${id}`
    );
  };


  // =====================================
  // BLOCK DIALOG
  // =====================================

  const handleBlockClick = (
    id: string
  ) => {

    const ngo =
      ngos.find(
        (item) =>
          item._id === id
      ) ?? null;

    setSelectedNgo(ngo);

    setBlockDialogOpen(true);
  };


  // =====================================
  // BLOCK / UNBLOCK
  // =====================================

  const handleConfirmBlock =
    async () => {

      if (!selectedNgo)
        return;

      try {

        if (selectedNgo.isBlocked) {
          await unblockNgo(selectedNgo._id).unwrap();
        } else {
          await blockNgo(selectedNgo._id).unwrap();
        }


        setBlockDialogOpen(
          false
        );

        setSelectedNgo(
          null
        );

        refetch();

      } catch (error) {

        console.error(
          "Block/unblock error:",
          error
        );
      }
    };


  // =====================================
  // APPROVE
  // =====================================

  const handleApprove =
    async (
      id: string
    ) => {

      try {

        await approveNgo(
          id
        ).unwrap();

        refetch();

      } catch (error) {

        console.error(
          "Approve NGO error:",
          error
        );
      }
    };


  // =====================================
  // DELETE
  // =====================================

  const handleDelete =
    async (
      id: string
    ) => {

      const confirmed =
        window.confirm(
          "Are you sure you want to delete this NGO?"
        );

      if (!confirmed)
        return;

      try {

        await deleteNgo(
          id
        ).unwrap();

        refetch();

      } catch (error) {

        console.error(
          "Delete NGO error:",
          error
        );
      }
    };


  // =====================================
  // LOADING
  // =====================================

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


  // =====================================
  // ERROR
  // =====================================

  if (isError) {

    return (
      <Container
        maxWidth="lg"
      >
        <Alert
          severity="error"
        >
          Failed to load NGOs.
        </Alert>
      </Container>
    );
  }


  // =====================================
  // PAGE
  // =====================================

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4,
      }}
    >

      <Stack spacing={3}>

        <Stack
          direction="row"
          justifyContent=
            "space-between"
          alignItems="center"
        >

          <Box>

            <Typography
              variant="h4"
              fontWeight={700}
            >
              NGO Management
            </Typography>

            <Typography
              color=
                "text.secondary"
            >
              Manage NGO
              organizations
            </Typography>

          </Box>


          <Button
            variant="outlined"
            startIcon={
              <RefreshIcon />
            }
            onClick={() =>
              refetch()
            }
          >
            Refresh
          </Button>

        </Stack>


        <NgoFilters
          values={filters}

          onChange={(
            key,
            value
          ) =>
            setFilters(
              (prev) => ({
                ...prev,

                [key]:
                  value,
              })
            )
          }

          onReset={() =>
            setFilters({
              search: "",
              status: "",
              verified: "",
            })
          }
        />


        <NgoTable
          ngos={
            filteredNgos
          }

          onView={
            handleView
          }

          onEdit={
            handleEdit
          }

          onBlock={
            handleBlockClick
          }

          onUnblock={
            handleBlockClick
          }

          onApprove={
            handleApprove
          }

          onDelete={
            handleDelete
          }
        />


        <NgoDetailsDialog
          open={
            detailsOpen
          }

          ngo={
            selectedNgo
          }

          onClose={() => {
            setDetailsOpen(
              false
            );

            setSelectedNgo(
              null
            );
          }}
        />


        <BlockNgoDialog
          open={
            blockDialogOpen
          }

          isBlocked={
            selectedNgo?.isBlocked ?? false
          }

          loading={
            blocking ||
            unblocking
          }

          onClose={() => {
            setBlockDialogOpen(
              false
            );

            setSelectedNgo(
              null
            );
          }}

          onConfirm={
            handleConfirmBlock
          }
        />

      </Stack>

    </Container>
  );
}
