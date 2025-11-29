const express = require('express');
const app = express();
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth.routes');
const productoRoutes = require('./routes/producto.routes');
const categoriaRoutes = require('./routes/categoria.routes');
const Categoria = require('./models/categoria.model');
const verifyToken = require('./middleware/auth.middleware');
const isAdmin = require('./middleware/role.middleware');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

console.log('Swagger Document loaded:', !!swaggerDocument);

app.get('/test', (req, res) => res.send('Server is working'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/auth', authRoutes);
app.use('/api/productos', verifyToken, productoRoutes);
app.use('/api/categorias', verifyToken, isAdmin, categoriaRoutes);

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida.');
        await sequelize.sync({ alter: true });
        console.log('Modelos sincronizados con la base de datos.');
        app.listen(process.env.PORT, () => {
            console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
        });
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
    }
})();