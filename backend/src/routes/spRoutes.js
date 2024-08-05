const express = require('express');
const router = express.Router();
const { getDatosAlumno, getAlumnosPorAsignaturaPractica, getConveniosVigentes, getIdentificacionPractica } = require('../controllers/spcontroller');

router.get('/datosAlumno/:alu_rut', getDatosAlumno);
router.get('/alumnosPractica/:ano/:periodo', getAlumnosPorAsignaturaPractica);
router.get('/convenios/:fecha_inicio', getConveniosVigentes);
router.get('/auth/:n_rut/:password', getIdentificacionPractica);

module.exports = router;
