
import Navbar from "@/src/components/common/Navbar";
import Footer from "@/src/components/common/Footer";
import CheckoutForm from "@/src/components/marketplace/CheckoutForm";

import {
  Box,
  Container,
} from "@mui/material";

export default function CheckoutPage() {
  return (
    <>
      <Navbar />

      <Box sx={{ py:8}}>
        <Container maxWidth="lg">
          <CheckoutForm />
        </Container>
      </Box>

      <Footer />
    </>
  );
}