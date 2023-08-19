import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../type/types";
import { actionFetchIcons } from "./actions";

const initialState: InitialState = {
  listIcons: [],
  currentIcons: [],
  loader: false,
  error: false,
};

const reducerIcons = createSlice({
  name: "icons",
  initialState,
  reducers: {
    addIcons: (state: InitialState, action) => {
      return {
        ...state,
        listIcons: action.payload,
      };
    },
    setCurrentIcon: (state: InitialState, action) => {
      return {
        ...state,
        currentIcons: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actionFetchIcons.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(actionFetchIcons.fulfilled, (state, action) => {
      state.loader = false;
      state.listIcons = action.payload;
    });
    builder.addCase(actionFetchIcons.rejected, (state, action) => {
      state.loader = false;
      state.error = true;
    });
  },
});

export const { addIcons, setCurrentIcon } = reducerIcons.actions;

export default reducerIcons.reducer;
