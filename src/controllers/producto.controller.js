const Categoria = require('../models/categoria.model');
const Producto = require('../models/producto.model');

exports.createProducto = async (req, res) => {
    try {
        const { nombre, precio, stock, CategoriaId } = req.body;
        const nuevoProducto = await Producto.create({ nombre, precio, stock, CategoriaId });
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el producto' });
    }
};

exports.getProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
};

exports.putProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, precio, stock, CategoriaId } = req.body;
        const producto = await Producto.findByPk(id);
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        producto.nombre = nombre;
        producto.precio = precio;
        producto.stock = stock;
        producto.CategoriaId = CategoriaId;
        await producto.save();
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
};

exports.deleteProducto = async (req, res) => {
    try {
        const { id } = req.params;  
        const producto = await Producto.findByPk(id);
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        await producto.destroy();
        res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
};