import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import adminProductsSlice from './admin/products-slice'

const store = configureStore({
    reducer : {
        auth : authReducer,
        adminProductos: adminProductsSlice,
    },
});

export default store