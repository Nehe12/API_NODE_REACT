const express = require('express');
const alumnoController = require('../app/controllers/alumnoController');
const Alummno = require('../app/models/Alumno');
const { authorize } = require('../app/mildware/authMiddwalre'); 

const router = express.Router();
const controller = new alumnoController(Alummno);

router.get('/',(req,res)=>controller.getAll(req,res));
router.post('/',(req,res)=>controller.create(req,res));

module.exports = router;