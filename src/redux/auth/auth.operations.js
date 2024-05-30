import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance, {
  clearAuthHeader,
  setAuthHeader,
} from "../../utils/axios/axios.js";
import {
  deleteUser,
  loginUser,
  logoutUser,
  signupUser,
  updateUser,
} from "../../utils/axios/userAxios.js";

/*
 * POST @ /users/signup
 * body: { name, email, password }
 */
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      console.log(userData);
      const res = await signupUser(userData);
      console.log("Відповідь", res.data);
      setAuthHeader(res.data.token);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * POST @ /users/login
 * body: { email, password }
 */
export const logIn = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      console.log({ email, password });
      const res = await loginUser({ email, password });
      console.log("Answerrrrrrrrrrrr", res.data);

      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * GET @ /users/me
 * headers: Authorization: Bearer token
 */

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const persistedToken = localStorage.getItem("token");

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      setAuthHeader(persistedToken);
      const res = await axiosInstance.get("/auth/me");
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    clearAuthHeader();
    const res = await logoutUser();
    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const destroyUser = createAsyncThunk(
  "auth/destroy",
  async (_, thunkAPI) => {
    try {
      const me = await axiosInstance.get("/auth/me");
      console.log(me, me.data._id);
      const res = await deleteUser(me.data._id);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const changeAvatar = createAsyncThunk(
  "auth/changeAvatar",
  async (file, thunkAPI) => {
    try {
      const data = new FormData();
      data.append("avatar", file);

      const me = await axiosInstance.patch("/auth/me", data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      console.log(me.data);
      return me.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const changeMe = createAsyncThunk(
  "auth/changeAvatar",
  async ({ id, data }, thunkAPI) => {
    try {
      const me = await updateUser(id, data);
      console.log("Зміннааааааааааааааааааа користувачаааааа", me.data);
      return me.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
