import { configureStore } from "@reduxjs/toolkit"
import persistedReducer from ".";

export const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: () => []
    
});

export default store;