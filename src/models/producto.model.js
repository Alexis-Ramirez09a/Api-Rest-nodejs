const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Categoria = require('./categoria.model');
const Producto = sequelize.define('producto', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})

// Relación de Producto con Categoria 1:N
Categoria.hasMany(Producto, {
    foreignKey: 'categoriaId',
    as: 'productos'
});

//rELACIÓN INVERSA
Producto.belongsTo(Categoria, {
    foreignKey: 'categoriaId',
    as: 'categoria'
});

module.exports = Producto;