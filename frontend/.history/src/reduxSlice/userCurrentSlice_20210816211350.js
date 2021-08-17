import { createSlice } from "@reduxjs/toolkit";

const currentUser = createSlice({
  name: "inforUser",
  initialState: { id: "", username: "", avatar: "", messages: [] },
  reducers: {
    addNewUser: (state, action) => {
      return action.payload;
    },
    addCurrentUser: (state, action) => {
      return state.messages.push(action.payload);
    },
  },
});

const { actions, reducer } = currentUser;
export const { addNewUser, addCurrentUser } = actions;
export default reducer;
