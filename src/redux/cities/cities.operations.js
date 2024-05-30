import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCities } from "../../utils/axios/cityAxios";

export const readAllCities = createAsyncThunk(
  "cities/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await getAllCities();
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
