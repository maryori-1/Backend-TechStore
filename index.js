require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

// Rutas
const authRoutes = require('./routes/auth');
const productosRoutes = require('./routes/productos');
const usuariosRoutes = require('./routes/usuarios');
const carritoRoutes = require('./routes/carrito');

connectDB();

const app = express();

// Middlewares
app.use(cors({
  origin: 'https://techstore-react-green.vercel.app/',
  credentials: true
}));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/carrito', carritoRoutes);

// Health
app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'TechStore Backend OK' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
