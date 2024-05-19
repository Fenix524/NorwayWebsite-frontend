import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/auth.slice";
import { citiesReducer } from "./cities/cities.slice";
import { landmarksReducer } from "./landmarks/landmarks.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cities: citiesReducer,
    landmarks: landmarksReducer,
  },
});
