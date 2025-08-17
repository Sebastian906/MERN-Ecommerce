const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()

mongoose
    .connect(process.env.MONGODB_CONNECTION)
    .then(() => console.log("Base de datos conectada"))
    .catch((error) => console.log(error));

const app = express()
const PORT = process.env.PORT || 5000

app.use(
    cors({
        origin : 'http://localhost:5173/',
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

app.listen(PORT, () => console.log(`Servidor cargando en puerto ${PORT}`))