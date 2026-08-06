"use client";

import {
  Box,
} from "@mui/material";

import Sidebar from "./Sidebar";

import Topbar from "./Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Sidebar />

      <Box
        sx={{
          flex: 1,
        }}
      >
        <Topbar />

        <Box sx={{p:3}}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}