const express = require('express');
const app = express();
const sequelize = require('./config/database');
const productoRoutes = require('./routes/producto.routes');
const categoriaRoutes = require('./routes/categoria.routes');
const Categoria = require('./models/categoria.model');
require('dotenv').config();
app.use(express.json());

app.use('/api/productos', productoRoutes);
app.use('/api/categorias', categoriaRoutes);
(
    async () => {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida.');
        await sequelize.sync({ alter: true });
        console.log('Modelos sincronizados con la base de datos.');
        app.listen(process.env.PORT, () => {
            console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
        });
    }
)();