const express = require('express');
const UserController = require('../app/controllers/userController');
const User = require('../app/models/User');
const { authorize } = require('../app/mildware/authMiddwalre'); 

const router = express.Router();
const controller = new UserController(User);

router.post('/login',(req,res)=>controller.login(req,res))
router.post('/registrar',(req,res)=>controller.registrar(req,res))
router.get('/', (req, res) => controller.getAll(req, res));
router.get('/:id', (req, res) => controller.getById(req, res));
router.post('/', (req, res) => controller.create(req, res));
router.put('/:id', (req, res) => controller.update(req, res));
router.delete('/:id', (req, res) => controller.remove(req, res));


module.exports = router;