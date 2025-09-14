import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    estaCargando: false,
    productList: [],
    productDetails: null
}

export const listarProductosFiltrados = createAsyncThunk(
    '/productos/listar-todos-los-productos',
    async ({ filterParams, sortParams }) => {

        const query = new URLSearchParams({
            ...filterParams,
            ordenarPor : sortParams
        })

        const result = await axios.get(
            `http://localhost:5000/api/shop/productos/listar?${query}`,
        );
        return result?.data;
    }
);

export const listarDetalles = createAsyncThunk(
    '/productos/listar-detalles',
    async (id) => {
        const result = await axios.get(
            `http://localhost:5000/api/shop/productos/listar/${id}`,
        );
        return result?.data;
    }
);

const shoppingProductsSlice = createSlice({
    name: 'shoppingProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(listarProductosFiltrados.pending, (state) => {
            state.estaCargando = true;
        }).addCase(listarProductosFiltrados.fulfilled, (state, action) => {
            state.estaCargando = false;
                state.productList = action.payload.data;
        }).addCase(listarProductosFiltrados.rejected, (state) => {
            state.estaCargando = false;
                state.productList = []
        }).addCase(listarDetalles.pending, (state) => {
            state.estaCargando = true;
        }).addCase(listarDetalles.fulfilled, (state, action) => {
            state.estaCargando = false;
                state.productDetails = action.payload.data;
        }).addCase(listarDetalles.rejected, (state) => {
            state.estaCargando = false;
                state.productDetails = null;
        });
    }
})

export default shoppingProductsSlice.reducer;