const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');

const generarToken = (user) => {
    return jwt.sign({
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        rol: user.rol
    },
        process.env.JWT_SECRET, { expiresIn: '1h' });
}

const generarRefreshToken = (user) => {
    return jwt.sign({
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        rol: user.rol
    },
        process.env.JWT_SECRET, { expiresIn: '7d' });
}

exports.registrar = async (req, res) => {
    try {
        console.log('Usuario Model:', Usuario);
        const { nombre, email, password, rol } = req.body;
        const existe = await Usuario.findOne({ where: { email: email } });
        if (existe) {
            return res.status(400).json({ mensaje: 'El correo ya está registrado' });
        }
        const hash = await bcrypt.hash(password, 10);
        const nuevoUsuario = await Usuario.create({ nombre, email, password: hash, rol: rol || 'user' });
        res.status(201).json({ mensaje: 'Usuario registrado exitosamente', usuario: nuevoUsuario });
    } catch (error) {
        console.error('Error en registrar:', error);
        res.status(500).json({ mensaje: 'Error al registrar usuario', error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        console.log('Usuario Model (Login):', Usuario);
        const { email, password } = req.body;
        const usuario = await Usuario.findOne({ where: { email: email } });
        if (!usuario) {
            return res.status(400).json({ mensaje: 'Credenciales inválidas' });
        }
        const esValido = await bcrypt.compare(password, usuario.password);
        if (!esValido) {
            return res.status(400).json({ mensaje: 'Credenciales inválidas' });
        }
        const token = generarToken(usuario);
        const refreshToken = generarRefreshToken(usuario);
        res.status(200).json({
            mensaje: 'Login exitoso',
            token,
            refreshToken
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ mensaje: 'Error al iniciar sesión', error: error.message });
    }
};