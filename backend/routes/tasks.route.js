
const taskCtrl = require('../controllers/task.controller');
const express = require('express');
const router = express.Router();


// rutas para el manejo de CRUD
router.post( '/',taskCtrl.createTask);
router.get('/', taskCtrl.getTasks);
router.get('/:id', taskCtrl.getTask);
router.put('/:id',  taskCtrl.editTask);
router.delete('/:id', taskCtrl.deleteTask);





module.exports = router;
