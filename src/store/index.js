import { configureStore } from '@reduxjs/toolkit';
import articleSlice from './articleSlice';
import loginSlice from './loginSlice';
import jobSlice from './jobSlice';

const store = configureStore(
    {
        reducer:{
            article:articleSlice.reducer,
            login:loginSlice.reducer,
            job:jobSlice.reducer
        }
    }
);

export default store;