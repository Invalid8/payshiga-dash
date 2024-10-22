import { configureStore } from "@reduxjs/toolkit";

import userReducer from "@/store/user";
import businessReducer from "@/store/business";

const store = configureStore({
  reducer: {
    user: userReducer,
    business: businessReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
