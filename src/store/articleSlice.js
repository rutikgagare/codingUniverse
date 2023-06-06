import { createSlice } from "@reduxjs/toolkit";

const articleSlice = createSlice({
    name:"article",
    initialState:{items:[]},
    reducers:{
        addArticle:(state,action)=>{
            state.items.push(action.payload);
        },
        replace:(state,action)=>{
            state.items = action.payload;
        }
    }
});

export const articleActions = articleSlice.actions;
export default articleSlice;   