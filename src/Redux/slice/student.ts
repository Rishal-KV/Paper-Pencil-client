import { createSlice } from "@reduxjs/toolkit";
let initialState = {
   
    student : null
}
const studentSlice = createSlice({
    name : "student",
    initialState,
    reducers:{
        studentLogin:(state,action) =>{
           
            state.student = action.payload.student
        },
        studentLogout : (state) =>{
           
            state.student = null
        }
    }
    
})

export const {studentLogin,studentLogout} = studentSlice.actions;
export default studentSlice.reducer