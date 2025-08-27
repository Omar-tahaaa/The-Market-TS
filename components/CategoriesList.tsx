"use client";
import { Box, Chip } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { fetchCategoryProducts } from "@/app/slices/categoryProductsSlice";
import {
  categorySelector,
  fetchCategoryList,
} from "@/app/slices/categoryListSlice";
import StatusMessage from "./statusMessage";

function CategoriesList() {
  const dispatch = useAppDispatch();
  const { categoryList, categoryListStatus } = useAppSelector(categorySelector);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All categories");

  useEffect(() => {
    dispatch(fetchCategoryList());
  }, [dispatch]);

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    dispatch(fetchCategoryProducts(cat));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column-reverse", md: "row" },
        width: "100%",
        justifyContent: "space-between",
        alignItems: { xs: "start", md: "center" },
        gap: 4,
        overflow: "auto",
        my: 4,
      }}
    >
      <Box
        sx={{
          display: "inline-flex",
          flexDirection: "row",
          gap: 3,
          overflow: "auto",
        }}
      >
        {categoryListStatus === "LOADING" && (
          <StatusMessage message="loading catogries..." />
        )}

        {categoryListStatus === "SUCCESSED" && categoryList.length > 0 && (
          <>
            <Chip
              size="medium"
              label="All categories"
              onClick={() => handleCategoryClick("All categories")}
              sx={{
                backgroundColor:
                  selectedCategory === "All categories" ? "#f59e0b" : "#f3f4f6",
                color:
                  selectedCategory === "All categories" ? "#fff" : "#111827",
                "&:hover": {
                  backgroundColor:
                    selectedCategory === "All categories"
                      ? "#fbbf24"
                      : "#e5e7eb",
                },
              }}
            />
            {categoryList.slice(0, 9).map((cat) => (
              <Chip
                key={cat}
                size="medium"
                label={cat.charAt(0).toUpperCase() + cat.slice(1)}
                onClick={() => handleCategoryClick(cat)}
                sx={{
                  borderRadius: "50px",
                  backgroundColor:
                    selectedCategory === cat ? "#f59e0b" : "#f3f4f6",
                  color: selectedCategory === cat ? "#fff" : "#111827",
                  "&:hover": {
                    backgroundColor:
                      selectedCategory === cat ? "#fbbf24" : "#e5e7eb",
                  },
                }}
              />
            ))}
          </>
        )}
        {categoryListStatus === "FAILED" && (
          <StatusMessage message="failed to load catogries" />
        )}
      </Box>
    </Box>
  );
}

export default CategoriesList;
