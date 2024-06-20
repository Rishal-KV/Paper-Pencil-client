import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  instructor: null,
  onlineStudents:[]
};

const instructorSlice = createSlice({
  name: "instructor",
  initialState,
  reducers: {
    instructorLogin: (state, action) => {
      state.instructor = action.payload.instructor;
    },
    instructorLogout: (state) => {
      state.instructor = null;
    },

    setOnlineStudents:(state,action) => {
      state.onlineStudents = action.payload.onlineStudents
    }
  },
});

export const { instructorLogin, instructorLogout,setOnlineStudents } = instructorSlice.actions;
export default instructorSlice.reducer;
