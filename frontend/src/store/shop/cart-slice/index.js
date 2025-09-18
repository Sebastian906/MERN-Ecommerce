import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    estaCargando: false,
    cartItems: [],
}

export const agregarAlCarrito = createAsyncThunk('carrito/agregar-carrito',
    async ({ usuarioId, productoId, cantidad }) => {
        const response = await axios.post(
            `http://localhost:5000/api/shop/carrito/agregar-carrito`, {
            usuarioId,
            productoId,
            cantidad,
        }
        );
        return response.data
    });

export const listarProductosDelCarrito = createAsyncThunk('carrito/listar-carrito/:usuarioId',
    async (usuarioId) => {
        const response = await axios.get(
            `http://localhost:5000/api/shop/carrito/listar-carrito/${usuarioId}`
        );
        return response.data
    });

export const actualizarCarrito = createAsyncThunk('carrito/actualizar-carrito',
    async ({ usuarioId, productoId, cantidad }) => {
        const response = await axios.put(
            `http://localhost:5000/api/shop/carrito/actualizar-carrito`, {
            usuarioId,
            productoId,
            cantidad,
        });
        return response.data
    });

export const eliminarProductosDeCarrito = createAsyncThunk('carrito/eliminar-carrito',
    async ({ usuarioId, productoId }) => {
        const response = await axios.delete(
            `http://localhost:5000/api/shop/carrito/${usuarioId}/${productoId}`
        );
        return response.data
    });

const shoppingCartSlice = createSlice({
    name: 'carritoDeCompra',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(agregarAlCarrito.pending, (state) => {
            state.estaCargando = true;
        }).addCase(agregarAlCarrito.fulfilled, (state, action) => {
            state.estaCargando = false;
                state.cartItems = (action.payload && action.payload.data && Array.isArray(action.payload.data.items))
                    ? action.payload.data.items
                    : [];
        }).addCase(agregarAlCarrito.rejected, (state) => {
            state.estaCargando = false;
            state.cartItems = []
        }).addCase(listarProductosDelCarrito.pending, (state) => {
            state.estaCargando = true;
        }).addCase(listarProductosDelCarrito.fulfilled, (state, action) => {
            state.estaCargando = false;
                state.cartItems = (action.payload && action.payload.data && Array.isArray(action.payload.data.items))
                    ? action.payload.data.items
                    : [];
        }).addCase(listarProductosDelCarrito.rejected, (state) => {
            state.estaCargando = false;
            state.cartItems = []
        }).addCase(actualizarCarrito.pending, (state) => {
            state.estaCargando = true;
        }).addCase(actualizarCarrito.fulfilled, (state, action) => {
            state.estaCargando = false;
                state.cartItems = (action.payload && action.payload.data && Array.isArray(action.payload.data.items))
                    ? action.payload.data.items
                    : [];
        }).addCase(actualizarCarrito.rejected, (state) => {
            state.estaCargando = false;
            state.cartItems = []
        }).addCase(eliminarProductosDeCarrito.pending, (state) => {
            state.estaCargando = true;
        }).addCase(eliminarProductosDeCarrito.fulfilled, (state, action) => {
            state.estaCargando = false;
                state.cartItems = (action.payload && action.payload.data && Array.isArray(action.payload.data.items))
                    ? action.payload.data.items
                    : [];
        }).addCase(eliminarProductosDeCarrito.rejected, (state) => {
            state.estaCargando = false;
            state.cartItems = []
        });
    }
});

export default shoppingCartSlice.reducer;