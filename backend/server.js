require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const authRouter = require('./routes/auth/auth-routes')
const adminProductsRouter = require('./routes/admin/products-routes')
const shopProductsRouter = require('./routes/shop/products-routes')

mongoose
    .connect(process.env.MONGODB_CONNECTION)
    .then(() => console.log("Base de datos conectada"))
    .catch((error) => console.log(error));

const app = express()
const PORT = process.env.PORT || 5000

app.use(
    cors({
        origin : process.env.FRONTEND_CONNECTION,
        methods : ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders : [
            "Content-Type",
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma'
        ],
        credentials : true
    })
)

app.use(cookieParser());
app.use(express.json());
app.use('/api/autorizacion', authRouter);
app.use('/api/admin/productos', adminProductsRouter);
app.use('/api/shop/productos', shopProductsRouter);

app.listen(PORT, () => console.log(`Servidor cargando en puerto ${PORT}`))