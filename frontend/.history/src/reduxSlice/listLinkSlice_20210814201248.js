import { createSlice } from "@reduxjs/toolkit";

const listLink = createSlice({
    name: "list Music",
    initialState: [],
    reducers:{
        addList: (state, action)=>{
            return action.payload;
        },
        addLinkToList: (state, action)=>{
            if (!state.includes(action.payload)) state.push(action.payload);
        },
        removeLinkFromList: (state, action)=>{
            const index = state.indexOf(action.payload);
            return state.splice(index,1);
        }
    }
})

const {actions, reducer} = listLink;
export default reducer;
export const {addList, addLinkToList, removeLinkFromList} = actions;