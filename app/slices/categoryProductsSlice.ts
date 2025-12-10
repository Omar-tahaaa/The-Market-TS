import { BASE_URL } from "@/utils/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./productsSlice";
import { RootState } from "../store/store";
import axios from "axios";

export interface ProductsState {
  categoryProducts: Product[];
  categoryProductsStatus: "idle" | "LOADING" | "SUCCESSED" | "FAILED";
}

const initialState: ProductsState = {
  categoryProducts: [],
  categoryProductsStatus: "idle",
};

export const fetchCategoryProducts = createAsyncThunk(
  "categoryProducts/fetchCategoryProducts",
  async (category: string, { rejectWithValue }) => {
    try {
      const { data } = await axios(`${BASE_URL}/products/category/${category}`);
      return data.products;
    } catch (error) {
      throw new Error("Failed to fetch cateogry products");
    }
  }
);

const categoryProductsSlice = createSlice({
  name: "categoryProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryProducts.pending, (state) => {
        state.categoryProductsStatus = "LOADING";
      })
      .addCase(
        fetchCategoryProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.categoryProducts = action.payload;
          state.categoryProductsStatus = "SUCCESSED";
        }
      )
      .addCase(fetchCategoryProducts.rejected, (state) => {
        state.categoryProductsStatus = "FAILED";
      });
  },
});

export const categoryProductsSelector = (state: RootState) =>
  state.categoryProducts;
export default categoryProductsSlice.reducer;
