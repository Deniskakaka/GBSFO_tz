import { createAsyncThunk } from "@reduxjs/toolkit";
import { Icon } from "../type/types";

export const actionFetchIcons = createAsyncThunk(
  "icons/fetchIcons",
  async () => {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/list");
    const data: Icon[] = await response.json();
    return data;
  }
);
