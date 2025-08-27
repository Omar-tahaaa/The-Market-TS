import { JSON_URL } from "@/utils/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export interface User {
  email: string;
  password: string;
}

export interface UserState {
  isLoading: boolean;
  users: User[];
  userName: string;
}

const initialState: UserState = {
  isLoading: false,
  users: [],
  userName: "",
};

export const fetchUsers = createAsyncThunk(
  "usersSlice/fetchUsers",
  async () => {
    try {
      const res = await fetch(`${JSON_URL}/users`);
      const data = await res.json();
      return data;
    } catch (error) {
      throw new Error("Failed to fetch users");
    }
  }
);

const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    setNewUsers: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    clearUserName: (state) => {
      state.userName = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const usersSelector = (state: RootState) => state.users;
export const { setNewUsers, setUserName, clearUserName } = usersSlice.actions;
export default usersSlice.reducer;
