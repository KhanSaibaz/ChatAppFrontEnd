import { configureStore } from '@reduxjs/toolkit';
import BaseApi from '../BaseQuery/basequery';
import authReducer from '../ApiSlice/Token.slice';


const store = configureStore({
    reducer: {
        [BaseApi.reducerPath]: BaseApi.reducer, // Corrected reducer reference
        auth:authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(BaseApi.middleware),
});

export default store;
