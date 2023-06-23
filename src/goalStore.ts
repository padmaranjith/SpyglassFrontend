import { configureStore } from '@reduxjs/toolkit';
import { goalApi } from './api/goalApi';

const goalStore=configureStore({

    reducer:{
        [goalApi.reducerPath]:goalApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(goalApi.middleware)
});

export default goalStore;