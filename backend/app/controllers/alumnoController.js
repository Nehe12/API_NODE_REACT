const Alumno = require("../models/Alumno");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

class AlummnoController {
    async getAll(req,res){
        try {
            const alumno = await Alumno.findAll();
            return res.status(200).json({msg:'Succesfully',alumnos:alumno})
            // return res.status(200).json(alumno)
            // res.send(alumno);
        } catch (error) {
            console.log(error);
            res.status(500).json({erro:'Error al obtener los alumnos'})
        }
    }
    async create(req, res) {
        try {
          const { nombre, apellido_p, apellido_m } = req.body;
          console.log(nombre);
          console.log(apellido_m);
          console.log(apellido_p);
          const nuevoAlumno = await Alumno.create({ nombre, apellido_p, apellido_m });
          res.json(nuevoAlumno);
        } catch (error) {
          res.status(500).json({ error: 'Error al crear el alumno' });
        }
      }
    
}


module.exports = AlummnoController;