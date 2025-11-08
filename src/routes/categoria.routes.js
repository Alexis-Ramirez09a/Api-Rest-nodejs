const controller = require('../controllers/categoria.controller');
const express = require('express');
const router = express.Router();
router.post('/crear', controller.createCategoria);
router.get('/listar', controller.getCategorias);
module.exports = router;