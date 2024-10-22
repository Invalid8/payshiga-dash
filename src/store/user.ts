import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  users: User[];
}

const dum_users: User[] = [
  {
    id: "1",
    name: "payshiga",
    email: "user1@payshiga.com",
    password: "payshiga",
  },
];

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  users: JSON.parse(localStorage.getItem("users") || JSON.stringify(dum_users)), // Store all users
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ email: string; password: string }>) {
      const user = state.users.find((u) => u.email === action.payload.email);
      if (user) {
        if (user.password !== action.payload.password) {
          throw new Error("Incorrect password");
        }
        state.user = user;
        localStorage.setItem("user", JSON.stringify(user)); // Persist logged-in user
      } else {
        throw new Error("User not found");
      }
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("user");
    },
    createUser(state, action: PayloadAction<User>) {
      if (state.users.find((u) => u.email === action.payload.email)) {
        throw new Error("User already exists.");
      }

      if (state.users.find((u) => u.name === action.payload.name)) {
        throw new Error("Name already exists.");
      }

      const newUser = action.payload;
      state.users.push(newUser);
      localStorage.setItem("users", JSON.stringify(state.users)); // Persist new users
    },
  },
});

export const { login, logout, createUser } = authSlice.actions;
export const selectUser = (state: RootState) => state.user.user;

export default authSlice.reducer;
