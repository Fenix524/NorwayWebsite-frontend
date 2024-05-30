import { createSlice } from "@reduxjs/toolkit";
import {
  register,
  logIn,
  logOut,
  refreshUser,
  destroyUser,
  changeAvatar,
} from "./auth.operations.js";
import { imgPathNormalize } from "../../utils/imgPathNormalize.js";

const initialState = {
  isAuthorize: false,
  isRefreshing: true,
  user: {
    firstName: "Володимир",
    lastName: "Зеленський",
    email: "valooodja@gmil.com",
    password: "123123",
    role: "admin",
    avatarURL:
      "https://www.gds.ro/wp-content/uploads/2020/07/Volodimir-Zelenski-1200x1200-1-1068x1068.jpg",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = {
          ...action.payload.user,
        };
        state.user.avatarURL = imgPathNormalize(state.user.avatarURL);

        state.token = action.payload.token;
        state.isAuthorize = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.user.avatarURL = imgPathNormalize(state.user.avatarURL);

        state.token = action.payload.token;
        state.isAuthorize = true;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.user.avatarURL = imgPathNormalize(state.user.avatarURL);

        state.isAuthorize = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.user = initialState.user;
        state.isAuthorize = false;
      })
      .addCase(destroyUser.fulfilled, (state, action) => {
        state.user = initialState.user;
        state.isAuthorize = false;
      })
      .addCase(changeAvatar.fulfilled, (state, action) => {
        state.user = action.payload;
        state.user.avatarURL = imgPathNormalize(state.user.avatarURL);
      });
  },
});

export const authReducer = authSlice.reducer;
