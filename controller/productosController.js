const Producto = require('../models/Producto');

exports.getProductos = async (req, res) => {
    const productos = await Producto.find();
    res.json(productos);
};

exports.getProductoById = async (req, res) => {
    const producto = await Producto.findById(req.params.id);
    res.json(producto);
};

exports.crearProducto = async (req, res) => {
    const producto = await Producto.create(req.body);
    res.status(201).json(producto);
};
