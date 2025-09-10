import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import adminProductsSlice from './admin/products-slice'
import shoppingProductsSlice from './shop/products-slice'

const store = configureStore({
    reducer : {
        auth : authReducer,
        adminProductos: adminProductsSlice,
        tiendaProductos: shoppingProductsSlice
    },
});

export default store