import { createSlice } from "@reduxjs/toolkit";

const inforUser = createSlice({
  name: "inforUser",
  initialState: {},
  addNewInfor: (state, action) => {
    return action.payload;
  },
});

const { actions, reducer } = inforUser;
export const { addNewInfor } = actions;
export default reducer;
