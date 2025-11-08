const Categoria = require('../models/categoria.model');

exports.createCategoria = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const nuevaCategoria = await Categoria.create({ nombre, descripcion });
        res.status(201).json(nuevaCategoria);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la categoría' });
    }
};

exports.getCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las categorías' });
    }
};

exports.putCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;
        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        categoria.nombre = nombre;
        categoria.descripcion = descripcion;
        await categoria.save();
        res.status(200).json(categoria);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la categoría' });
    }
};

exports.deleteCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        await categoria.destroy();
        res.status(200).json({ message: 'Categoría eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la categoría' });
    }
};