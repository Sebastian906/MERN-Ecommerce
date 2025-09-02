/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    estaCargando: false,
    productList: []
}

export const agregarNuevoProducto = createAsyncThunk(
    '/productos/agregar-nuevo-producto',
    async (formData) => {
        const result = await axios.post(
            'http://localhost:5000/api/admin/productos/agregar',
            formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return result?.data;
    }
);

export const listarTodosLosProductos = createAsyncThunk(
    '/productos/listar-todos-los-productos',
    async () => {
        const result = await axios.get(
            'http://localhost:5000/api/admin/productos/listar',
        );
        return result?.data;
    }
);

export const editarProducto = createAsyncThunk(
    '/productos/editar-producto',
    async ({id, formData}) => {
        const result = await axios.put(
            `http://localhost:5000/api/admin/productos/editar/${id}`,
            formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return result?.data;
    }
);

export const borrarProducto = createAsyncThunk(
    '/productos/borrar-producto',
    async (id) => {
        const result = await axios.delete(
            `http://localhost:5000/api/admin/productos/borrar/${id}`,
        );
        return result?.data;
    }
);

const AdminProductsSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(listarTodosLosProductos.pending, (state) => {
            state.estaCargando = true
        }).addCase(listarTodosLosProductos.fulfilled, (state, action) => {
            state.estaCargando = false
            state.productList = action.payload.data;
        }).addCase(listarTodosLosProductos.rejected, (state, action) => {            
            state.estaCargando = false
            state.productList = []
        })
    }
})

export default AdminProductsSlice.reducer