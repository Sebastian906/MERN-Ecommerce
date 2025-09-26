import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    estaCargando: false,
    addressList: [],
}

export const agregarNuevaCuenta = createAsyncThunk(
    '/cuentas/agregar-cuenta', 
    async(formData) => {
        const response = await axios.post(
            'http://localhost:5000/api/shop/cuenta/agregar', 
            formData
        );
        return response.data;
    }
);

export const listarTodosLasCuentas = createAsyncThunk(
    '/cuentas/listar-cuentas', 
    async(usuarioId) => {
        const response = await axios.get(
            `http://localhost:5000/api/shop/cuenta/listar/${usuarioId}`, 
        );
        return response.data;
    }
);

export const editarCuenta = createAsyncThunk(
    '/cuentas/editar-cuenta', 
    async({usuarioId, cuentaId, formData}) => {
        const response = await axios.put(
            `http://localhost:5000/api/shop/cuenta/editar/${usuarioId}/${cuentaId}`,
            formData
        );
        return response.data;
    }
);

export const eliminarCuenta = createAsyncThunk(
    '/cuentas/eliminar-cuenta', 
    async({usuarioId, cuentaId}) => {
        const response = await axios.delete(
            `http://localhost:5000/api/shop/cuenta/eliminar/${usuarioId}/${cuentaId}`,
        );
        return response.data;
    }
);

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {},
    extraReducers : (builder) => {
        builder.addCase(agregarNuevaCuenta.pending, (state) => {
            state.estaCargando = true;
        }).addCase(agregarNuevaCuenta.fulfilled, (state) => {
            state.estaCargando = false;
        }).addCase(agregarNuevaCuenta.rejected, (state) => {
            state.estaCargando = false;
        }).addCase(listarTodosLasCuentas.pending, (state) => {
            state.estaCargando = true;
        }).addCase(listarTodosLasCuentas.fulfilled, (state, action) => {
            state.estaCargando = false;
            state.addressList = action.payload.data;
        }).addCase(listarTodosLasCuentas.rejected, (state) => {
            state.estaCargando = false;
            state.addressList = [];
        });
    }
});

export default addressSlice.reducer;