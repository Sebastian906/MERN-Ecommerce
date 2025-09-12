import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    estaCargando: false,
    productList: []
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

const shoppingProductsSlice = createSlice({
    name: 'shoppingProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(listarProductosFiltrados.pending, (state) => {
            state.estaCargando = true
        }).addCase(listarProductosFiltrados.fulfilled, (state, action) => {
            state.estaCargando = false,
                state.productList = action.payload.data;
        }).addCase(listarProductosFiltrados.rejected, (state) => {
            state.estaCargando = false,
                state.productList = []
        })
    }
})

export default shoppingProductsSlice.reducer;