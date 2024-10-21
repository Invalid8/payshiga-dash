import { configureStore } from "@reduxjs/toolkit";

import userReducer from "@/store/user";
import businessReducer from "@/store/business";

const store = configureStore({
  reducer: {
    user: userReducer,
    business: businessReducer,
    // Add other
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
