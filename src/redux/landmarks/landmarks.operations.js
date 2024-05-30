import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllLandmarks } from "../../utils/axios/landmarkAxios";

export const readAllLandmarks = createAsyncThunk(
  "landmarks/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await getAllLandmarks();
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
