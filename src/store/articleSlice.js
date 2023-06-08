import { createSlice } from "@reduxjs/toolkit";

const articleSlice = createSlice({
    name:"article",
    initialState:{items:[]},
    reducers:{
        addArticle:(state,action)=>{
            state.items.push(action.payload);
        },
        deleteArticle:(state,action)=>{
            const updatedItems = state.items.filter((item)=>{
                if(item.id !== action.payload){
                    return item;
                }
            });
            console.log(updatedItems);
            
            state.items = updatedItems;
        },
        editArticle:(state,action)=>{
            const updatedItems = state.items.map((item)=>{
                if(item.id === action.payload.id){
                    return action.payload;
                }else{
                    return item;
                }
            });
            state.items = updatedItems;
            console.log(updatedItems);
        },
        replace:(state,action)=>{
            state.items = action.payload;
        }
    }
});

export const articleActions = articleSlice.actions;
export default articleSlice;   