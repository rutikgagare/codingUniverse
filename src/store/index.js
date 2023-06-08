import { configureStore } from '@reduxjs/toolkit';
import articleSlice from './articleSlice';
import loginSlice from './loginSlice';


const store = configureStore(
    {
        reducer:{
            article:articleSlice.reducer,
            login:loginSlice.reducer
        }
    }
);

export default store;