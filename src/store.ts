import { configureStore } from "@reduxjs/toolkit";
import { Todoapi } from "./services/api";

export const store = configureStore({
  reducer: {
    [Todoapi.reducerPath]: Todoapi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Todoapi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;