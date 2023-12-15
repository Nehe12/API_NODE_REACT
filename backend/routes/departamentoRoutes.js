const express = require('express');
const DepartamentoController = require('../app/controllers/departamentoController');
const Departamento = require('../app/models/Departamentos');
const { authorize } = require('../app/mildware/authMiddwalre'); 

const router = express.Router();
const controller = new DepartamentoController(Departamento);

router.get('/',(req,res)=>controller.getAll(req,res));

module.exports = router;