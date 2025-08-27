"use client";

import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "@/app/slices/categoryListSlice";
import productsReducer from "@/app/slices/productsSlice";
import categoryProductsReducer from "@/app/slices/categoryProductsSlice";
import usersReducer from "@/app/slices/usersSlice";
import { Provider } from "react-redux";
import { PropsWithChildren } from "react";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    categoryProducts: categoryProductsReducer,
    users: usersReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const ProviderStore = ({ children }: PropsWithChildren) => {
  return <Provider store={store}>{children}</Provider>;
};
