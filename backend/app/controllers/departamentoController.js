const Departamento = require("../models/Departamentos");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

class DepartamentoController {
    async getAll(req,res){
        try {
            const departamentos = await Departamento.findAll();
            return res.status(200).json({msg:'Succesfully',departamento:departamentos})
        } catch (error) {
            console.log(error);
            res.status(500).json({erro:'Error al obtener los departamentos'})
        }
    }
}


module.exports = DepartamentoController;