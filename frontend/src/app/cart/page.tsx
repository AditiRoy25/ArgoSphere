import Navbar from "@/src/components/common/Navbar";
import Footer from "@/src/components/common/Footer";

import CartItem from "@/src/components/marketplace/CartItem";
import OrderSummary from "@/src/components/marketplace/OrderSummary";

import {
Box,
Container,
Grid,
Typography
} from "@mui/material";

export default function CartPage(){

return(

<>

<Navbar/>

<Box sx={{py:8}}>

<Container maxWidth="xl">

<Typography
variant="h4"
sx={{fontWeight:700,
mb:4}}
>
Shopping Cart
</Typography>

<Grid
container
spacing={4}
>

<Grid
size={{
xs:12,
md:8
}}
>

<CartItem/>

<CartItem/>

</Grid>

<Grid
size={{
xs:12,
md:4
}}
>

<OrderSummary/>

</Grid>

</Grid>

</Container>

</Box>

<Footer/>

</>

);

}