import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  admin: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,

  reducers: {
    adminLogin: (state, action) => {
      state.admin = action.payload.admin;
    },
    adminLogout: (state) => {
      state.admin = null;
    },
  },
});

export const {adminLogin, adminLogout} = adminSlice.actions
export default adminSlice.reducer

