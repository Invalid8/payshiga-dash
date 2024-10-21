import { showNotification } from "@/utils/showNotification";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Business {
  id: string;
  type: string;
  name: string;
  industry: string;
  size: string;
  annualVolume: string;
  userId: string; // Attach to logged-in user
}

interface BusinessState {
  businesses: Business[];
  activeBusinessId: string | null;
}

const initialState: BusinessState = {
  businesses: JSON.parse(localStorage.getItem("businesses") || "[]"), // Retrieve businesses from storage
  activeBusinessId: null,
};

const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    addBusiness(state, action: PayloadAction<Business>) {
      state.businesses.push(action.payload);
      localStorage.setItem("businesses", JSON.stringify(state.businesses)); // Persist businesses
      showNotification("success", "top-right", undefined, {
        message: "Business account created successfully",
      });
    },
    setActiveBusiness(state, action: PayloadAction<string>) {
      state.activeBusinessId = action.payload;
    },
  },
});

export const { addBusiness, setActiveBusiness } = businessSlice.actions;
export default businessSlice.reducer;
