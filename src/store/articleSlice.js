import { createSlice } from "@reduxjs/toolkit";
import { auth } from '../config/firebase';

const articleSlice = createSlice({
    name: "article",
    initialState: { items: [] },
    reducers: {
        addArticle: (state, action) => {
            state.items.push(action.payload);
        },
        deleteArticle: (state, action) => {
            const updatedItems = state.items.filter((item) => {
                if (item.id !== action.payload) {
                    return item;
                }
            });
            console.log(updatedItems);

            state.items = updatedItems;
        },
        editArticle: (state, action) => {
            state.items = state.items.map((item) => {
                if (item.id === action.payload.id) {
                    return action.payload;
                }
                return item;
            });
            console.log(state.items);
        },
        replace: (state, action) => {
            state.items = action.payload;
        },
        addLikeHandler: (state, action) => {
            const articleId = action.payload;
            state.items = state.items.map((item) => {
                if(item.id === articleId) {
                    const updatedLikes = [...item.likes,auth?.currentUser?.uid];
                    console.log(updatedLikes);
                    return {...item,likes:updatedLikes};
                }
                else{
                    return item;
                }
            });
        },
        removeLikeHandler: (state, action) => {
            let articleId = action.payload;

            state.items = state.items.map((item) => {
                if(item.id === articleId) {
                    item.likes = item.likes.filter((userid)=>{
                        return(userid !== auth?.currentUser?.uid);
                    });
                }
                return item;
            });
        }
    }
});

export const articleActions = articleSlice.actions;
export default articleSlice;   