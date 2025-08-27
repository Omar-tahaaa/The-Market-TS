import { Box } from "@mui/material";
import ProductCard from "./ProductCard";
import { Product } from "@/app/slices/productsSlice";

type ProductsProp = {
  products: Product[];
};

function ProductGrid({ products }: ProductsProp) {
  return (
    <Box
      sx={{
        mt: 2,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: 3,
      }}
    >
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </Box>
  );
}

export default ProductGrid;
