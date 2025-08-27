"use client";
import StatusMessage from "./statusMessage";
import ProductGrid from "./ProductGrid";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { categoryProductsSelector } from "@/app/slices/categoryProductsSlice";
import {
  fetchProducts,
  Product,
  productsSelector,
} from "@/app/slices/productsSlice";

function ProductsList() {
  const { productsData, productsStatus } = useAppSelector(productsSelector);
  const { categoryProducts, categoryProductsStatus } = useAppSelector(
    categoryProductsSelector
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts(30));
  }, [dispatch]);

  let tempProducts: Product[] = [];
  if (productsData && productsData.length > 0) {
    for (let i in productsData) {
      let randomIndex = Math.floor(Math.random() * productsData.length);

      while (tempProducts.includes(productsData[randomIndex])) {
        randomIndex = Math.floor(Math.random() * productsData.length);
      }
      tempProducts[i] = productsData[randomIndex];
    }
  }

  if (categoryProducts.length > 0) {
    tempProducts = categoryProducts;
  }

  if (productsStatus === "LOADING") {
    return <StatusMessage message="Loading products..." />;
  }

  if (categoryProductsStatus === "LOADING") {
    return <StatusMessage message="Loading category products..." />;
  }

  if (productsStatus === "FAILED") {
    return <StatusMessage message="failed loading products" />;
  }

  if (categoryProductsStatus === "FAILED") {
    return <StatusMessage message="failed loading category products" />;
  }

  if (
    productsStatus === "SUCCESSED" ||
    categoryProductsStatus === "SUCCESSED"
  ) {
    return <ProductGrid products={tempProducts} />;
  }
  return null;
}

export default ProductsList;
