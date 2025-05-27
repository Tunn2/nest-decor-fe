import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    login: (state, actions) => {
      state = actions.payload;
      return state;
    },
    logout: () => {
      return null;
    },
  },
});

export const { login, logout } = counterSlice.actions;
export const selectUser = (store) => store.user;
export default counterSlice.reducer;
