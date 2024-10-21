import { showNotification } from "@/utils/showNotification";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Business } from "./business";

interface User {
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
        showNotification("success", "top-right", undefined, {
          message: "User sign-in successfully",
        });
      } else {
        throw new Error("User not found");
      }
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("user");
    },
    createUser(state, action: PayloadAction<User>) {
      const newUser = action.payload;
      state.users.push(newUser);
      localStorage.setItem("users", JSON.stringify(state.users)); // Persist new users
      showNotification("success", "top-right", undefined, {
        message: "Account created successfully",
      });
    },
  },
});

export const { login, logout, createUser } = authSlice.actions;
export default authSlice.reducer;

export const isAuth = (): { user: User; businesses: Business[] } | null => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!user) return null;

  // Retrieve all businesses from the store
  const businesses: Business[] = JSON.parse(
    localStorage.getItem("businesses") || "[]"
  );
  const userBusinesses = businesses.filter((b) => b.userId === user.id);

  return {
    user,
    businesses: userBusinesses,
  };
};
