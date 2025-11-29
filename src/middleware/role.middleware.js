const isAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ mensaje: 'No autenticado' });
    }

    if (req.user.rol !== 'admin') {
        return res.status(403).json({ mensaje: 'Acceso denegado: Se requieren permisos de administrador' });
    }

    next();
};

module.exports = isAdmin;
