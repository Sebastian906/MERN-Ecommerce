import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    estaAutenticado: false,
    estaCargando: false,
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

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // eslint-disable-next-line no-unused-vars
        setUser: (state, action) => {},
    },
    extraReducers: (builder)=> {
        builder.addCase(registrarUsuario.pending, (state) => {
            state.estaCargando = true
        }).addCase(registrarUsuario.fulfilled, (state, action) => {
            state.estaCargando = false;
            state.usuario = action.payload;
            state.estaAutenticado = false;
        // eslint-disable-next-line no-unused-vars
        }).addCase(registrarUsuario.rejected, (state, action) => {
            state.estaCargando = false;
            state.usuario = null;
            state.estaAutenticado = false;
        })
    }
})

export const { setUser } = authSlice.actions;
export default authSlice.reducer