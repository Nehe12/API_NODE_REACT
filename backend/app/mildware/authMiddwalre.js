const { roles } = require('./roles'); // Importa los roles según sea necesario

function authorize(permiso) {
  return (req, res, next) => {
    const usuario = req.usuario; // Supongamos que tienes un objeto 'usuario' adjunto a la solicitud
    if (usuario && usuario.permisos && usuario.permisos.includes(permiso)) {
      next(); // El usuario tiene el permiso necesario, continúa con la siguiente middleware/ruta
    } else {
      res.status(403).json({ error: 'Acceso prohibido' }); // Usuario no autorizado
    }
  };
}

module.exports = { authorize };