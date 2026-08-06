import { Box, Toolbar } from "@mui/material";

import Sidebar from "../../components/admin/layout/Sidebar";
import Header from "../../components/admin/layout/Header";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar />

      <Header />

      <Box
        component="main"
        sx={{
          ml: "270px",
          mt: "64px",
          minHeight: "100vh",
          bgcolor: "#f5f7fb",
          p: 3,
        }}
      >
        <Toolbar />

        {children}
      </Box>
    </>
  );
}