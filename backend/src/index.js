
const express = require("express");
const app = express()

require("dotenv").config({
    path:"./.env"
})


app.use(express.json())
const cors = require("cors");
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3001"]
    //origin: "http://146.83.194.142:1207"
}))
const listEndpoints = require('express-list-endpoints');
app.use('/endpoints', (req, res) => {
    const endpoints = listEndpoints(app);
    res.json(endpoints);
  });

const routesEmpresa = require("./routes/routesEmpresa");
const routesOferta = require("./routes/routesOferta");
const routerInscripcion = require("./routes/inscripcionRoutes");
const routerBitacoras = require("./routes/routesBitacoras");
const routerArchivoInscripcion = require("./routes/routesArchivoInscripcion");
const routerArchivoInforme = require("./routes/routesArchivoInforme");
const routerArchivoEvaluacion = require("./routes/routesArchivoEvaluacion");
const routerAuth = require("./routes/routesAuth");
const routerLogin = require("./routes/LoginRoutes");
const routerComuna = require("./routes/comunaRoutes");
const routerAlumno = require("./routes/AlumnoRoutes");
const routerPeriodo = require("./routes/periodosRoutes");
const routerEstadosInscripcion = require("./routes/EstadosInscripcionRoutes");
const routerInscribe= require("./routes/routesInscribe");
const routerAptitud = require('./routes/aptitudesRoutes');
const routerSupervisor = require('./routes/supervisorRoutes');
const routerConocimiento  = require('./routes/conocimientoRoutes');
const routerRubro = require('./routes/rubroRoutes');
const routerRangoInscripcion = require('./routes/rangoInscripcionRoutes');
const router = require('./routes/spRoutes');

app.use("/api/empresa",routesEmpresa);
app.use("/api/oferta",routesOferta);
app.use("/api/inscripcion",routerInscripcion);
app.use("/api/bitacoras",routerBitacoras);
app.use("/api/archivoinscripcion",routerArchivoInscripcion);
app.use("/api/archivoinforme",routerArchivoInforme);
app.use("/api/archivoevaluacion",routerArchivoEvaluacion);
app.use("/api/auth",routerAuth);
app.use("/api/auth",routerLogin);
app.use("/api/comuna",routerComuna);
app.use("/api/alumno",routerAlumno);
app.use("/api/periodo",routerPeriodo);
app.use("/api/estadosinscripcion",routerEstadosInscripcion);
app.use("/api/inscribe",routerInscribe);
app.use(express.json())
app.use('/api/aptitud', routerAptitud);
app.use('/api/supervisor', routerSupervisor);
app.use('/api/conocimiento', routerConocimiento)
app.use('/api/rubro', routerRubro)
app.use('/api/rango', routerRangoInscripcion)
app.use('/api/sp', router)

app.listen(process.env.PORT,()=>{
    console.log(`El servidor está escuchando en el puerto ${process.env.PORT}`)
})

