"use client";

import {
  Avatar,
  Chip,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";

import {
  DataGrid,
  GridColDef,
} from "@mui/x-data-grid";

import VisibilityIcon from
  "@mui/icons-material/Visibility";

import EditIcon from
  "@mui/icons-material/Edit";

import BlockIcon from
  "@mui/icons-material/Block";

import CheckCircleIcon from
  "@mui/icons-material/CheckCircle";

import VerifiedIcon from
  "@mui/icons-material/Verified";

import DeleteIcon from
  "@mui/icons-material/Delete";

import type {
  INgo,
} from "../../../types/ngo.types";

const imageUrl = (value?: string) => {
  if (!value) return undefined;
  if (/^(https?:|data:|blob:)/i.test(value)) return value;
  return `${process.env.NEXT_PUBLIC_API_URL}/${value.replace(/^\//, "")}`;
};


interface Props {

  ngos: INgo[];

  onView:
    (id: string) => void;

  onEdit:
    (id: string) => void;

  onBlock:
    (id: string) => void;

  onUnblock:
    (id: string) => void;

  onApprove?:
    (id: string) => void;

  onDelete?:
    (id: string) => void;
}


export default function NgoTable({
  ngos,

  onView,

  onEdit,

  onBlock,

  onUnblock,

  onApprove,

  onDelete,
}: Props) {


  const columns:
    GridColDef<INgo>[] = [

    {
      field: "logo",

      headerName: "Logo",

      width: 80,

      renderCell: ({
        row,
      }) => (

        <Avatar
          src={imageUrl(
            row.logo ||
              (typeof row.user === "string"
                ? undefined
                : row.user.image)
          )}
        >
          {row
            .organizationName
            ?.charAt(0)}
        </Avatar>
      ),
    },


    {
      field:
        "organizationName",

      headerName:
        "Organization",

      flex: 1.2,
    },


    {
      field: "userName",

      headerName: "User",

      flex: 1,

      valueGetter: (
        _value,
        row
      ) => {

        if (
          typeof row.user ===
          "string"
        ) {
          return "-";
        }

        return (
          row.user.name ??
          "-"
        );
      },
    },


    {
      field: "email",

      headerName: "Email",

      flex: 1.2,

      valueGetter: (
        _value,
        row
      ) => {

        if (
          typeof row.user ===
          "string"
        ) {
          return "-";
        }

        return (
          row.user.email ??
          "-"
        );
      },
    },


    {
      field:
        "registrationNumber",

      headerName:
        "Registration No.",

      flex: 1,
    },


    {
      field:
        "ministryApproval",

      headerName:
        "Approval",

      width: 120,

      renderCell: ({
        row,
      }) => (

        <Chip
          size="small"

          label={
            row.ministryApproval
              ? "Approved"
              : "Pending"
          }

          color={
            row.ministryApproval
              ? "success"
              : "warning"
          }
        />
      ),
    },


    {
      field:
        "accountStatus",

      headerName:
        "Status",

      width: 110,

      renderCell: ({
        row,
      }) => {

        const blocked = row.isBlocked ?? false;

        return (
          <Chip
            size="small"

            label={
              blocked
                ? "Blocked"
                : "Active"
            }

            color={
              blocked
                ? "error"
                : "success"
            }
          />
        );
      },
    },


    {
      field: "actions",

      headerName:
        "Actions",

      width: 250,

      sortable: false,

      filterable: false,

      renderCell: ({
        row,
      }) => {

        const blocked = row.isBlocked ?? false;

        return (

          <Stack
            direction="row"
            spacing={0.5}
          >

            <Tooltip
              title="View"
            >
              <IconButton
                color="primary"

                onClick={() =>
                  onView(
                    row._id
                  )
                }
              >
                <VisibilityIcon />
              </IconButton>
            </Tooltip>


            <Tooltip
              title="Edit"
            >
              <IconButton
                color="primary"

                onClick={() =>
                  onEdit(
                    row._id
                  )
                }
              >
                <EditIcon />
              </IconButton>
            </Tooltip>


            {!row
              .ministryApproval &&
              onApprove && (

              <Tooltip
                title=
                  "Approve NGO"
              >
                <IconButton
                  color="success"

                  onClick={() =>
                    onApprove(
                      row._id
                    )
                  }
                >
                  <VerifiedIcon />
                </IconButton>
              </Tooltip>
            )}


            {blocked ? (

              <Tooltip
                title="Unblock"
              >
                <IconButton
                  color="success"

                  onClick={() =>
                    onUnblock(
                      row._id
                    )
                  }
                >
                  <CheckCircleIcon />
                </IconButton>
              </Tooltip>

            ) : (

              <Tooltip
                title="Block"
              >
                <IconButton
                  color="warning"

                  onClick={() =>
                    onBlock(
                      row._id
                    )
                  }
                >
                  <BlockIcon />
                </IconButton>
              </Tooltip>
            )}


            {onDelete && (

              <Tooltip
                title="Delete"
              >
                <IconButton
                  color="error"

                  onClick={() =>
                    onDelete(
                      row._id
                    )
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}

          </Stack>
        );
      },
    },
  ];


  return (
    <DataGrid
      autoHeight

      rows={ngos}

      columns={columns}

      getRowId={(
        row
      ) => row._id}

      disableRowSelectionOnClick

      pageSizeOptions={[
        10,
        20,
        50,
      ]}

      initialState={{
        pagination: {
          paginationModel: {
            page: 0,
            pageSize: 10,
          },
        },
      }}
    />
  );
}
