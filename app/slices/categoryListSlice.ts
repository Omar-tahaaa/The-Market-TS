import { BASE_URL } from "@/utils/api";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export const fetchCategoryList = createAsyncThunk(
  "categoryList/fetchCategoryList",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/products/category-list`);
      const data = await res.json();
      return data;
    } catch (error) {
      throw new Error("Failed to fetch category list");
    }
  }
);

export interface CategoryListState {
  categoryList: Array<string>;
  categoryListStatus: "idle" | "LOADING" | "SUCCESSED" | "FAILED";
}

const initialState: CategoryListState = {
  categoryList: [],
  categoryListStatus: "idle",
};

const categorySlice = createSlice({
  name: "categoryList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryList.pending, (state) => {
        state.categoryListStatus = "LOADING";
      })
      .addCase(
        fetchCategoryList.fulfilled,
        (state, action: PayloadAction<Array<string>>) => {
          state.categoryListStatus = "SUCCESSED";
          state.categoryList = action.payload;
        }
      )
      .addCase(fetchCategoryList.rejected, (state) => {
        state.categoryListStatus = "FAILED";
      });
  },
});

export const categorySelector = (state: RootState) => state.categories;
export default categorySlice.reducer;
