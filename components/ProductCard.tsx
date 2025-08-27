import { Product } from "@/app/slices/productsSlice";

import { Card, CardMedia, CardContent, Typography } from "@mui/material";

type ProductProp = {
  product: Product;
};

function ProductCard({ product }: ProductProp) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        boxShadow: 3,
        transition: "transform 0.2s",
        "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.images[0]}
        alt={product.title}
        sx={{
          objectFit: "contain",
          backgroundColor: "#f5f5f5",
          p: 2,
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {product.category}
        </Typography>
        <Typography variant="subtitle1" color="primary" fontWeight={600}>
          ${product.price}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
