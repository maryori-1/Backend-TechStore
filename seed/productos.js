const mongoose = require("mongoose");
const Producto = require("../models/Producto");
require("dotenv").config();

const productos = [
  {
    name: "Auriculares Noise Cancelling Pro",
    price: 45000,
    category: "Audio",
    type: "technology",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    description: "Sonido premium con cancelación activa de ruido.",
    isNew: true,
    stock: 15
  },
  {
    name: "Smartwatch Elite Series 5",
    price: 60000,
    originalPrice: 80000,
    category: "Wearables",
    type: "technology",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    description: "Monitorea tu salud y actividad diaria.",
    isNew: true,
    isOffer: true,
    stock: 8
  },
  {
    name: "Laptop Ultra Slim Pro",
    price: 950000,
    category: "Computación",
    type: "technology",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80",
    description: "Rendimiento potente en un diseño liviano.",
    stock: 5
  }
];

const seedProductos = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Producto.deleteMany();
    await Producto.insertMany(productos);
    console.log("Productos insertados correctamente");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedProductos();
