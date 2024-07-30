const express = require('express');
const router = express.Router();
const { getDatosAlumno } = require('../controllers/spcontroller');

router.get('/datos-alumno/:id', getDatosAlumno);

module.exports = router;
