import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import axios from "axios";

export interface User {
  id?: string;
  _id?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  gender?: string;
  terms?: boolean;
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
      const { data } = await axios.get("/api/users");
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
