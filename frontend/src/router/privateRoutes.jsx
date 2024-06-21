import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import DashboardAlumno from "../pages/Alumno/DashboardAlumno";
import OfertasPublicas from "../pages/Alumno/ofertas_publicas/ofertas_publicas";
import DashboardProfesional from "../pages/ProfesionalApoyo/dashboardProfesional/DashboardProfesional";
import ModificarEmpresa from "../pages/ProfesionalApoyo/dashboardProfesional/empresas/modificar_empresa";
import PerfilAlumno from "../pages/Alumno/perfil-alumno/PerfilAlumno";
import DetalleOfertaPractica from "../pages/Alumno/detalleofertapractica/detalleofertapractica";
import DetalleInscripcion from "../pages/Alumno/detalleInscripcion/DetalleInscripcion";
import InscripcionPractica from "../pages/Alumno/inscripcion_practica/inscripcionPractica";
import ModificarDatos from "../pages/Alumno/inscripcion_practica/modificarDatos";
import DocumentosInscripcion from "../pages/Alumno/documentos/documentosInscripcion";
import OfertaPractica from "../pages/ProfesionalApoyo/dashboardProfesional/ofertas_practica/ofertapractica";
import CrearOferta from "../pages/ProfesionalApoyo/dashboardProfesional/ofertas_practica/components/crear_oferta";
import ModificarOferta from "../pages/ProfesionalApoyo/dashboardProfesional/ofertas_practica/components/modificarOferta";
import CentrosPracticas from "../pages/ProfesionalApoyo/dashboardProfesional/empresas/centros_practicas";
import EstadoPracticas from "../pages/ProfesionalApoyo/dashboardProfesional/estado_practicas/estado_practicas";
import InformacionGeneral from "../pages/ProfesionalApoyo/dashboardProfesional/estado_practicas/informacion_general_practica";
import VerDocumentosInscripcion from "../pages/ProfesionalApoyo/dashboardProfesional/estado_practicas/verdocumentosinscripcion";
import EvaluarPractica from "../pages/ProfesionalApoyo/dashboardProfesional/estado_practicas/evaluarPractica";
import BitAlumnoRender from "../pages/Alumno/BitacoraAlumno/CreateBitacoAlumno/BitaAlumnoRender";
import RenderBitaAlumno from "../pages/Alumno/BitacoraAlumno/ShowBitaAlum/RenderBitaAlumno";
import RenderDetailsAlumno from "../pages/Alumno/BitacoraAlumno/DetailsAlumno/RenderDetailsAlumno";
import EditingBitAlumno from "../pages/Alumno/BitacoraAlumno/ModificarAlumno/EditingBitAlumno";
import Practicas from "../pages/ProfesionalApoyo/dashboardProfesional/practicas/practicas";

import BitacorasAlumno from "../pages/ProfesionalApoyo/dashboardProfesional/bitacoras_alumno/bitacorasAlumno";
import DetalleBitacora from "../pages/ProfesionalApoyo/dashboardProfesional/bitacoras_alumno/detalleBitacora";

import IngresarEmpresa from "../pages/ProfesionalApoyo/dashboardProfesional/empresas/ingresar_empresa";
import InscripcionesPendientes from "../pages/ProfesionalApoyo/dashboardProfesional/inscripciones_pendientes/ins_pendientes";
import InformePractica from "../pages/Alumno/informe/informe";
import EvaluacionPractica from "../pages/Alumno/evaluacion/evaluacion";

import { ProtectedRoute } from "./ProtectedRoute";


const PrivateRoutes = ()=>{

    const {user} = useContext(AuthContext)

    const rol = localStorage.getItem("rol");

    if(rol && rol == 1 ){
        return (
            <Routes>

                <Route element={<ProtectedRoute user={user} />}>
                    <Route path="/dashboard_alumno" element={<DashboardAlumno/>} />
                    <Route path="/ofertas_publicas" element={<OfertasPublicas/>} />
                    <Route path="/perfil" element={<PerfilAlumno/>} />
                    <Route path="/detalleoferta/:id" element={<DetalleOfertaPractica/>} />
                    <Route path="/detalleinscripcion/:id" element={<DetalleInscripcion/>}/>
                    <Route path="/inscripcionpractica/:id" element={<InscripcionPractica/>} />
                    <Route path="/modificarinscripcion/:id" element={<ModificarDatos/>} />
                    <Route path="/documentosinscripcion/:id" element={<DocumentosInscripcion/>} />
                    <Route path="/bitacoralumno" element={<BitAlumnoRender />} />
                    <Route path="/showbitalumno" element={<RenderBitaAlumno/>} />
                    <Route path="/detailsbitacoralumno/:id" element={<RenderDetailsAlumno/>} />
                    <Route path="/modificarbitacoralumno/:id" element={<EditingBitAlumno/>} />
                    <Route path="/informe/:id" element={<InformePractica/>} />
                    <Route path="/evaluacion/:id" element={<EvaluacionPractica/>} />

                </Route>
            </Routes>
        )
    }

    if(rol && rol == 2){
        return (
            <Routes>
                <Route path="/dashboard_encargado" element={<DashboardProfesional/>} />
                <Route path="/ins_pendientes" element={<InscripcionesPendientes/>} />
                <Route path="/empresa_alumno" element={<EmpresaAlumno/>} />
                <Route path="/centros_practicas" element={<CentrosPracticas/>} />
                <Route path="/ingresar_empresa" element={<IngresarEmpresa/>} />
                <Route path="/modificarEmpresa/:id" element={<ModificarEmpresa/>} />
                <Route path="/ofertapracticas" element={<OfertaPractica/>} />
                <Route path="/crearoferta" element={<CrearOferta/>} />
                <Route path="/modificaroferta/:id" element={<ModificarOferta/>} />
                <Route path="/estadopracticas/:anio/:periodo/:asignatura/:carrera" element={<EstadoPracticas/>}/>
                <Route path="/informaciongeneral/:inscribe" element={<InformacionGeneral/>} />
                <Route path="/documentosinscripcion/:id" element={<VerDocumentosInscripcion/>} />
                <Route path="/evaluarinscripcion/:id" element={<EvaluarPractica/>} />
                <Route path="/bitacoras/:id" element={<BitacorasAlumno/>} />
                <Route path="/detallebitacora/:id" element={<DetalleBitacora/>} />
                <Route path="/practicas" element={<Practicas/>} />
            </Routes>
        )
    }
};


export default PrivateRoutes;