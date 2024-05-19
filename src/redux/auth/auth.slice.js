import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthorize: false,
  isRefreshing: false,
  user: {
    firstName: "Володимир",
    lastName: "Зеленський",
    email: "valooodja@gmil.com",
    password: "123123",
    role: "admin",
    avatarUrl:
      "https://www.gds.ro/wp-content/uploads/2020/07/Volodimir-Zelenski-1200x1200-1-1068x1068.jpg",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      state.isAuthorize = true;
    },
    register: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      state.isAuthorize = true;
    },
    logout: (state) => {
      state.isAuthorize = false;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { login, register, logout, incrementByAmount } = authSlice.actions;

export const authReducer = authSlice.reducer;
