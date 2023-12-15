const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class UserController {

    async registrar(req, res) {
        try {
          const { nombre, correo, contraseña } = req.body;
    
          // Verifica si el correo ya está registrado
          const usuarioExistente = await Usuario.findOne({ where: { correo } });
          if (usuarioExistente) {
            return res.status(400).json({ error: 'El correo ya está registrado' });
          }
    
          // Hashea la contraseña antes de almacenarla en la base de datos
          const hashedContraseña = await bcrypt.hash(contraseña, 10);
    
          // Crea un nuevo usuario
          const nuevoUsuario = await Usuario.create({ nombre, correo, contraseña: hashedContraseña });
    
          // Genera un token de acceso con expiración de 1 hora (3600 segundos)
          const token = jwt.sign({ usuarioId: nuevoUsuario.id }, 'tu_secreto', { expiresIn: '1h' }); // Deberías usar una clave secreta más segura en producción
    
          // Devuelve el token
          res.json({ token });
        } catch (error) {
          res.status(500).json({ error: 'Error al registrar el usuario' });
        }
      }
    async login(req, res) {
        try {
          const { correo, contraseña } = req.body;
    
          // Verifica si el usuario existe en la base de datos
          const usuario = await Usuario.findOne({ where: { correo } });
          if (!usuario) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
          }
    
          // Compara la contraseña proporcionada con la almacenada en la base de datos
          const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
          if (!contraseñaValida) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
          }
    
          // Genera un token de acceso con expiración de 1 hora (3600 segundos)
          const token = jwt.sign({ usuarioId: usuario.id }, 'tu_secreto', { expiresIn: '1h' }); // Deberías usar una clave secreta más segura en producción
    
          // Devuelve el token
          res.json({ token });
        } catch (error) {
          res.status(500).json({ error: 'Error en el inicio de sesión' });
        }
      }
    

  async getAll(req, res) {
    try {
      const user = await User.findAll();
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los alumnos' });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const alumno = await Alumno.findByPk(id);
      res.json(alumno);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el alumno' });
    }
  }

  async create(req, res) {
    try {
      const { nombre, edad, curso } = req.body;
      const nuevoAlumno = await Alumno.create({ nombre, edad, curso });
      res.json(nuevoAlumno);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el alumno' });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nombre, edad, curso } = req.body;
      await Alumno.update({ nombre, edad, curso }, { where: { id } });
      res.json({ message: 'Alumno actualizado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el alumno' });
    }
  }

  async remove(req, res) {
    try {
      const { id } = req.params;
      await Alumno.destroy({ where: { id } });
      res.json({ message: 'Alumno eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el alumno' });
    }
  }
}


module.exports = UserController;