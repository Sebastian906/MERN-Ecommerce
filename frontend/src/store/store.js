import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import adminProductsSlice from './admin/products-slice'
import shoppingProductsSlice from './shop/products-slice'
import shoppingCartSlice from './shop/cart-slice'
import shoppingAddressSlice from './shop/address-slice'

const store = configureStore({
    reducer : {
        auth : authReducer,
        adminProductos: adminProductsSlice,
        tiendaProductos: shoppingProductsSlice,
        carritoProductos: shoppingCartSlice,
        cuentaProductos: shoppingAddressSlice,
    },
});

export default store