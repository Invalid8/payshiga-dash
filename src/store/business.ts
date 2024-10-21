import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Business model
export interface Business {
  id: string;
  type: string;
  name: string;
  industry: string;
  size: string;
  country: string;
  annualVolume: string;
  userId: string; // Attach to logged-in user
}

// Business State
interface BusinessState {
  businesses: Business[];
  activeBusiness: Business | null;
  switching: boolean;
  busFormOpen: boolean;
}

// Utility functions for localStorage
const getBusinessesFromStorage = (): Business[] => {
  return JSON.parse(localStorage.getItem("businesses") || "[]");
};

const saveBusinessesToStorage = (businesses: Business[]) => {
  localStorage.setItem("businesses", JSON.stringify(businesses));
};

// Initial State
const initialState: BusinessState = {
  businesses: getBusinessesFromStorage(),
  activeBusiness: null,
  switching: false,
  busFormOpen: false,
};

// Redux slice
const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    openBusForm(state) {
      state.busFormOpen = true;
    },
    closeBusForm(state) {
      if (state.businesses.length === 0) return;
      state.busFormOpen = false;
    },
    setSwitching(state, action: PayloadAction<boolean>) {
      state.switching = action.payload;
    },
    getBusinesses(state, action: PayloadAction<{ userId: string }>) {
      const userBusinesses = state.businesses.filter(
        (business) => business.userId === action.payload.userId
      );

      if (userBusinesses.length === 0) {
        state.busFormOpen = true;
        throw new Error("No business found.");
      } else {
        if (!state.activeBusiness) state.activeBusiness = state.businesses[0];
      }

      state.businesses = userBusinesses;
    },
    addBusiness(state, action: PayloadAction<Business>) {
      state.switching = true;

      const existingBusiness = state.businesses.find(
        (b) =>
          b.name === action.payload.name && b.userId === action.payload.userId
      );

      if (existingBusiness) {
        state.switching = false;
        throw new Error("Business name already exists.");
      }

      const updatedBusinesses = [...state.businesses, action.payload];
      saveBusinessesToStorage(updatedBusinesses); // Save to localStorage
      state.businesses = updatedBusinesses;
      state.busFormOpen = false;

      // Set the newly created business as active
      state.activeBusiness = action.payload;

      state.switching = false;
    },
    setActiveBusiness(
      state,
      action: PayloadAction<{ id: string; userId: string }>
    ) {
      const business = state.businesses.find(
        (b) => b.id === action.payload.id && b.userId === action.payload.userId
      );

      if (!business) {
        throw new Error("Invalid Business Id");
      }

      state.switching = true;

      state.activeBusiness = business;
      state.switching = false;
    },
  },
});

// Export actions and reducer
export const {
  addBusiness,
  setActiveBusiness,
  openBusForm,
  closeBusForm,
  getBusinesses,
  setSwitching,
} = businessSlice.actions;

export default businessSlice.reducer;
