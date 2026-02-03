const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
exports.register = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        if (!nombre || !email || !password) {
            return res.status(400).json({ msg: 'Datos incompletos' });
        }

        const existe = await Usuario.findOne({ email });
        if (existe) {
            return res.status(400).json({ msg: 'Usuario ya existe' });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const usuario = await Usuario.create({
            nombre,
            email,
            password: passwordHash
        });

        res.status(201).json({ msg: 'Usuario creado correctamente' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        const ok = await bcrypt.compare(password, usuario.password);
        if (!ok) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        const token = jwt.sign(
            { id: usuario._id, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.json({
            token,
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// USUARIO LOGUEADO
exports.me = async (req, res) => {
    res.json(req.usuario);
};
