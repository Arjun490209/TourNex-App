import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import authSlice from "./slices/authSlice";
import tournamentReducer from "./slices/tournamentSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authSlice,
    tournament: tournamentReducer,
  },
});
