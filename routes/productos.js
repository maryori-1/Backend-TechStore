const express = require('express');
const router = express.Router();
const {
    getProductos,
    getProductoById,
    crearProducto
} = require('../controller/productosController');

router.get('/', getProductos);
router.get('/:id', getProductoById);
router.post('/', crearProducto);

module.exports = router;
