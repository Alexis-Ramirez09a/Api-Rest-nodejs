const controller = require('../controllers/producto.controller');
const express = require('express');
const router = express.Router();
router.post('/crear', controller.createProducto);
router.get('/listar', controller.getProductos);
module.exports = router;