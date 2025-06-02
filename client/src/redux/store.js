import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import stationApi from "./api/api";

const store = configureStore({
  reducer: {
    auth:authSlice.reducer,
    [stationApi.reducerPath]: stationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stationApi.middleware),
});

export default store;
