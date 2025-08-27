import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import image from "@/public/car-shopping-cart.jpg";
import CategoriesList from "@/components/CategoriesList";
import ProductsList from "@/components/ProductsList";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "products",
};

async function Products() {
  return (
    <ProtectedRoute>
      <Container maxWidth="lg" component="main" sx={{ my: 8 }}>
        <Box sx={{ width: "100%" }}>
          <Image
            src={image}
            height="340"
            style={{ width: "100%" }}
            alt="car-shopping"
            loading="lazy"
          />
        </Box>
        <CategoriesList />
        <ProductsList />
      </Container>
    </ProtectedRoute>
  );
}

export default Products;
