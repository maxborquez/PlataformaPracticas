import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import DashboardAlumno from "../pages/Alumno/DashboardAlumno";
import OfertasPublicas from "../pages/Alumno/ofertas_publicas/ofertas_publicas";
import DashboardProfesional from "../pages/ProfesionalApoyo/DashboardProfesional";
import ModificarEmpresa from "../pages/ProfesionalApoyo/empresas/modificar_empresa";
import PerfilAlumno from "../pages/Alumno/perfil-alumno/PerfilAlumno";
import DetalleOfertaPractica from "../pages/Alumno/ofertas_publicas/components/detalleofertapractica";
import InscripcionPractica from "../pages/Alumno/inscripcion_practica/inscripcionPractica";
import ModificarDatos from "../pages/Alumno/inscripcion_practica/modificarDatos";
import DocumentosInscripcion from "../pages/Alumno/documentos/documentosInscripcion";
import OfertaPractica from "../pages/ProfesionalApoyo/ofertas_practica/ofertapractica";
import CrearOferta from "../pages/ProfesionalApoyo/ofertas_practica/components/crear_oferta";
import ModificarOferta from "../pages/ProfesionalApoyo/ofertas_practica/components/modificarOferta";
import CentrosPracticas from "../pages/ProfesionalApoyo/empresas/centros_practicas";
import Practicas from "../pages/ProfesionalApoyo/practicas/practicas";
import ListaEstudiantes from "../pages/ProfesionalApoyo/practicas/lista_estudiantes";
import PerfilEstudiante from "../pages/ProfesionalApoyo/practicas/ver_info_estudiante"; 

import IngresarEmpresa from "../pages/ProfesionalApoyo/empresas/ingresar_empresa";
import InscripcionesPendientes from "../pages/ProfesionalApoyo/inscripciones_pendientes/ins_pendientes";
import InformePractica from "../pages/Alumno/informe/informe";
import EvaluacionPractica from "../pages/Alumno/evaluacion/evaluacion";
import Bitacoras from "../pages/Alumno/bitacoras/bitacoras";

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
                    <Route path="/inscripcionpractica/:id" element={<InscripcionPractica/>} />
                    <Route path="/modificarinscripcion/:id" element={<ModificarDatos/>} />
                    <Route path="/documentosinscripcion/:id" element={<DocumentosInscripcion/>} />
                    <Route path="/informe/:id" element={<InformePractica/>} />
                    <Route path="/evaluacion/:id" element={<EvaluacionPractica/>} />
                    <Route path="/bitacoras/:id_inscripcion_practica" element={<Bitacoras />} />
                </Route>
            </Routes>
        )
    }

    if(rol && rol == 2){
        return (
            <Routes>
                <Route path="/dashboard_encargado" element={<DashboardProfesional/>} />
                <Route path="/ins_pendientes" element={<InscripcionesPendientes/>} />
                <Route path="/centros_practicas" element={<CentrosPracticas/>} />
                <Route path="/ingresar_empresa" element={<IngresarEmpresa/>} />
                <Route path="/modificarEmpresa/:id" element={<ModificarEmpresa/>} />
                <Route path="/ofertapracticas" element={<OfertaPractica/>} />
                <Route path="/crearoferta" element={<CrearOferta/>} />
                <Route path="/modificaroferta/:id" element={<ModificarOferta/>} />
                <Route path="/practicas" element={<Practicas/>} />
                <Route path="/listaestudiantes/:careerId/:asignaturaId/:anio/:periodo" element={<ListaEstudiantes/>} />
                <Route path="/perfilEstudiante/:rut" element={<PerfilEstudiante />} />
            </Routes>
        )
    }
};


export default PrivateRoutes;