import { BASE_URL } from "@/utils/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (limit: number, { rejectWithValue }) => {
    try {
      const { data } = await axios(`${BASE_URL}/products?limit=${limit}`);
      return data.products;
    } catch (error) {
      throw new Error("Failed to fetch products");
    }
  }
);

export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  images: Array<string>;
}

export interface ProductsState {
  productsData: Product[];
  productsStatus: "idle" | "LOADING" | "SUCCESSED" | "FAILED";
}

const initialState: ProductsState = {
  productsData: [],
  productsStatus: "idle",
};
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.productsStatus = "LOADING";
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.productsData = action.payload;
          state.productsStatus = "SUCCESSED";
        }
      )
      .addCase(fetchProducts.rejected, (state) => {
        state.productsStatus = "FAILED";
      });
  },
});

export const productsSelector = (state: RootState) => state.products;
export default productsSlice.reducer;
