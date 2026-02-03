const Carrito = require('../models/Carrito');

exports.getCarrito = async (req, res) => {
    const carrito = await Carrito.find().populate('productos.producto');
    res.json(carrito);
};

exports.agregarCarrito = async (req, res) => {
    const carrito = await Carrito.create(req.body);
    res.status(201).json(carrito);
};
