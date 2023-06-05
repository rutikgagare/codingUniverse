import { createSlice } from "@reduxjs/toolkit";

const articleSlice = createSlice({
    name:"article",
    initialState:{items:[]},
    reducers:{
        addArticle:(state,action)=>{
            console.log(action.payload);
            state.items.push(action.payload);
            console.log('added');
            console.log(state.items.length);
        },
        replaceAll:(state,action)=>{
            state.items = action.payload;
        }
    }
});

export const articleActions = articleSlice.actions;
export default articleSlice;   