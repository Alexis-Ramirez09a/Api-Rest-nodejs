const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.json());

// Request, response
app.get('/api/hello', (req, res) => {
    var nombre = "Alexis";
    res.status(200).json({ message: `Hola ${nombre}, bienvenido a mi API` })
});

//POST
app.post('/api/hello', (req, res) => {
    const { nombre, apellido } = req.body
    console.log(nombre, apellido);
    res.status(201).json({ mensaje: `Hola ${nombre} ${apellido}, tu información fue recibida correctamente` })
});

//Crear un endpoint de tipo post que reciba en body datos de un producto y devolver por consola el end point /api/producto
app.post('/api/producto', (req, res) => {
    const { nombre, precio, descripcion } = req.body;
    console.log(`Producto recibido: Nombre - ${nombre}, Precio $ ${precio}, Descripción - ${descripcion}`);
    res.status(201).json({ mensaje: `Producto ${nombre} recibido correctamente` });
});
app.listen(process.env.PORT, () => {
    console.log(`El servidor está corriendo en el puerto ${process.env.PORT}`);
});