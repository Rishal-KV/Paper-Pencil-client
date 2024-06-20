import { combineReducers } from "@reduxjs/toolkit";
import studentReducer from "./slice/student";
import instructorRecuer from "./slice/instructor";
import adminReducer from "./slice/admin";
const rootReducer = combineReducers({
  student: studentReducer,
  instructor: instructorRecuer,
  admin: adminReducer,
});

export default rootReducer;
