import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name:"login",
    initialState:{logedIn:false},
    reducers:{
        login:(state)=>{
            state.logedIn = true;
        },
        logout:(state)=>{
            state.logedIn = false;
        }
    }
});

export const loginActions = loginSlice.actions;
export default loginSlice;
