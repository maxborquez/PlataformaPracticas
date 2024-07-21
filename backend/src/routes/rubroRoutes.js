// routes.js
const express = require('express');
const routerRubro = express.Router();
const rubroController = require('../controllers/rubroController');

routerRubro.get('/getAll', rubroController.getAllRubros);
routerRubro.get('/:id', rubroController.getRubroById);
routerRubro.post('create', rubroController.createRubro);
routerRubro.put('/update/:id', rubroController.updateRubro);
routerRubro.delete('/delete/:id', rubroController.deleteRubro);

module.exports = routerRubro;
