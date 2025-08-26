/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    estaAutenticado: false,
    estaCargando: true,
    usuario: null,
}

export const registrarUsuario = createAsyncThunk('/autorizacion/registro',
    async (formData) => {
        const response = await axios.post(
            'http://localhost:5000/api/autorizacion/registro',
            formData, {
            withCredentials: true
        });
        return response.data
    }
)

export const loginUsuario = createAsyncThunk('/autorizacion/iniciar-sesion',
    async (formData) => {
        const response = await axios.post(
            'http://localhost:5000/api/autorizacion/iniciar-sesion',
            formData, {
            withCredentials: true
        });
        return response.data
    }
)

export const verificarAutenticacion = createAsyncThunk('/autorizacion/verificar-autenticacion',
    async () => {
        const response = await axios.get(
            'http://localhost:5000/api/autorizacion/verificar-autenticacion', {
            withCredentials: true,
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            }
        });
        return response.data
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => { },
    },
    extraReducers: (builder) => {
        builder.addCase(registrarUsuario.pending, (state) => {
            state.estaCargando = true
        }).addCase(registrarUsuario.fulfilled, (state, action) => {
            state.estaCargando = false;
            state.usuario = null;
            state.estaAutenticado = false;
        }).addCase(registrarUsuario.rejected, (state, action) => {
            state.estaCargando = false;
            state.usuario = null;
            state.estaAutenticado = false;
        }).addCase(loginUsuario.pending, (state) => {
            state.estaCargando = true
        }).addCase(loginUsuario.fulfilled, (state, action) => {
            console.log(action);
            state.estaCargando = false;
            state.usuario = action.payload.success ? action.payload.usuario : null;
            state.estaAutenticado = action.payload.success;
        }).addCase(loginUsuario.rejected, (state, action) => {
            state.estaCargando = false;
            state.usuario = null;
            state.estaAutenticado = false;
        }).addCase(verificarAutenticacion.pending, (state) => {
            state.estaCargando = true
        }).addCase(verificarAutenticacion.fulfilled, (state, action) => {
            state.estaCargando = false;
            state.usuario = action.payload.success ? action.payload.usuario : null;
            state.estaAutenticado = action.payload.success;
        }).addCase(verificarAutenticacion.rejected, (state, action) => {
            state.estaCargando = false;
            state.usuario = null;
            state.estaAutenticado = false;
        })
    }
})

export const { setUser } = authSlice.actions;
export default authSlice.reducer