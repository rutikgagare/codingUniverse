import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:"jobPortal",
    initialState:{items:[]},
    reducers:{
        addJob:(state,action)=>{
            state.items.unshift(action.payload);
        },
        deleteJob:(state,action)=>{
            const updatedItems = state.items.filter((item)=>{
                if (item.id !== action.payload) {
                    return item;
                }
            });
            state.items = updatedItems;
        },
        updateJob:(state,action)=>{
            state.items = state.items.map((item)=>{
                if(item.id == action.payload.id){
                    return action.payload;
                }

                return item;
            });
            console.log("update ",state.items);
        },
        replace:(state,action)=>{
            state.items = action.payload;
        }
    }
});

export const jobActions = jobSlice.actions;
export default jobSlice;