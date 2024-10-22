import { configureStore } from "@reduxjs/toolkit";

import userReducer from "@/store/features/user";
import businessReducer from "@/store/features/business";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    user: userReducer,
    business: businessReducer,
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
