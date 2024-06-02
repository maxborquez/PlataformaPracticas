
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
const routerInscripcion = require("./routes/routesInscripcion");
const routerBitacoraAlumno = require("./routes/routesBitacoraAlumno");
const routerArchivoBitacoraAlumno = require("./routes/routesArchivoBitacoraAlumno");
const routerArchivoInscripcion = require("./routes/routesArchivoInscripcion");
const routerAuth = require("./routes/routesAuth");
const routerLogin = require("./routes/LoginRoutes");
const routerComunas = require("./routes/comunasRoutes");
const routerEstadoEmpresa = require("./routes/EstadoEmpresaRouter");
const routerAlumno = require("./routes/AlumnoRoutes");
const routerPeriodo = require("./routes/periodosRoutes");
const routerEstadosInscripcion = require("./routes/EstadosInscripcionRoutes");
app.use("/api/empresa",routesEmpresa);
app.use("/api/oferta",routesOferta);
app.use("/api/inscripcion",routerInscripcion);
app.use("/api/bitacoralumno",routerBitacoraAlumno);
app.use("/api/archivoalumno",routerArchivoBitacoraAlumno);
app.use("/api/archivoinscripcion",routerArchivoInscripcion);
app.use("/api/auth",routerAuth);
app.use("/api/auth",routerLogin);
app.use("/api/comuna",routerComunas);
app.use("/api/estadoempresa",routerEstadoEmpresa);
app.use("/api/alumno",routerAlumno);
app.use("/api/periodo",routerPeriodo);
app.use("/api/estadosinscripcion",routerEstadosInscripcion);
const routerAptitud = require('./routes/aptitudesRoutes');
const routerRepresentante = require('./routes/representanteRoutes');
const routerConocimiento  = require('./routes/conocimientoRoutes');

app.use(express.json())
app.use('/api/aptitud', routerAptitud);
app.use('/api/representante', routerRepresentante);
app.use('/api/conocimiento', routerConocimiento)



app.listen(process.env.PORT,()=>{
    console.log(`El servidor está escuchando en el puerto ${process.env.PORT}`)
})

