import { useContext, useState } from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes, useRoutes } from "react-router-dom";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import Login from "./pages/login/login";
import DashboardAlumno from "./pages/Alumno/DashboardAlumno";
import OfertasPublicas from "./pages/Alumno/ofertas_publicas/ofertas_publicas";
import PublicRoutes from "./router/publicRoutes";
import PrivateRoutes from "./router/privateRoutes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ProtectedRoute } from "./router/ProtectedRoute";

import { ProtectedRouteProfesional } from "./router/protectedrouteprofesional";
import DashboardProfesional from "./pages/ProfesionalApoyo/DashboardProfesional";
import PerfilAlumno from "./pages/Alumno/perfil-alumno/PerfilAlumno";
import DetalleOfertaPractica from "./pages/Alumno/ofertas_publicas/components/detalleofertapractica";
import ModificarDatos from "./pages/Alumno/inscripcion_practica/modificarDatos";
import DocumentosInscripcion from "./pages/Alumno/documentos/documentosInscripcion";
import InscripcionPractica from "./pages/Alumno/inscripcion_practica/inscripcionPractica";
import CentrosPracticas from "./pages/ProfesionalApoyo/empresas/centros_practicas";
import ModificarEmpresa from "./pages/ProfesionalApoyo/empresas/modificar_empresa";
import OfertaPractica from "./pages/ProfesionalApoyo/ofertas_practica/ofertapractica";
import CrearOferta from "./pages/ProfesionalApoyo/ofertas_practica/components/crear_oferta";
import ModificarOferta from "./pages/ProfesionalApoyo/ofertas_practica/components/modificarOferta";
import VisualizadorDocumento from "./pages/Alumno/documentos/visualizadorDocumento";
import IngresarEmpresa from "./pages/ProfesionalApoyo/empresas/ingresar_empresa";
import InscripcionesPendientes from "./pages/ProfesionalApoyo/inscripciones_pendientes/ins_pendientes";
import Practicas from "./pages/ProfesionalApoyo/practicas/practicas";
import MiPractica from "./pages/Alumno/mi_practica/mi_practica";
import InformePractica from "./pages/Alumno/informe/informe";
import EvaluacionPractica from "./pages/Alumno/evaluacion/evaluacion";
import ListaEstudiantes from "./pages/ProfesionalApoyo/practicas/lista_estudiantes";
import DetalleOfertas from "./pages/ProfesionalApoyo/ofertas_practica/components/detalleOfertas";
import PerfilEstudiante from "./pages/ProfesionalApoyo/practicas/ver_info_estudiante";
import Bitacoras from "./pages/Alumno/bitacoras/bitacoras";
import CrearBitacora from "./pages/Alumno/bitacoras/components/crear_bitacora";
import DetalleBitacora from "./pages/Alumno/bitacoras/components/detalle_bitacora";
import EditarBitacora from "./pages/Alumno/bitacoras/components/editar_bitacora";
import InformesPendientes from "./pages/ProfesionalApoyo/informesPendientes/informesPendientes";
import EvaluacionesPendientes from "./pages/ProfesionalApoyo/evaluacionesPendientes/evaluaciones_pendientes";
import BitacorasAlumnos from "./pages/ProfesionalApoyo/bitacorasAlumnos/bitacoras_alumnos";
import DetalleBitacoraAlumno from "./pages/ProfesionalApoyo/bitacorasAlumnos/components/detalle_bitacora_alumno";
import VisualizadorInformes from "./pages/ProfesionalApoyo/informesPendientes/visualizadorInformes";
import VisualizadorEvaluaciones from "./pages/ProfesionalApoyo/evaluacionesPendientes/visualizadorEvaluaciones";
import AptitudesPendientes from "./pages/ProfesionalApoyo/aptitudesPendientes/aptitudesPendientes";
import DetalleCentroPractica from "./pages/ProfesionalApoyo/empresas/detalleCentroPractica";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes>
            <Route path="/" index element={<Login />} />
            <Route path="/visualizador/:id" element={<VisualizadorDocumento />}/>
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard_alumno" element={<DashboardAlumno />} />
              <Route path="/ofertas_publicas" element={<OfertasPublicas />} />
              <Route path="/perfil" element={<PerfilAlumno />} />
              <Route path="/mi_practica" element={<MiPractica />} />
              <Route path="/bitacoras/:id_inscripcion_practica" element={<Bitacoras />} />
              <Route path="/detalle_bitacora/:id_bitacora" element={<DetalleBitacora />} />
              <Route path="/editar_bitacora/:id_bitacora" element={<EditarBitacora />} />
              <Route path="/crear_bitacora/:id_inscripcion_practica" element={<CrearBitacora />} />
              <Route path="/detalleoferta/:id" element={<DetalleOfertaPractica />}/>
              <Route path="/inscripcionpractica/:id" element={<InscripcionPractica />}/>
              <Route path="/modificarinscripcion/:id" element={<ModificarDatos />}/>
              <Route path="/informe/:id" element={<InformePractica />} />
              <Route path="/evaluacion/:id" element={<EvaluacionPractica />} />
              <Route path="/documentosinscripcion/:id" element={<DocumentosInscripcion />}/>
            </Route>
            <Route element={<ProtectedRouteProfesional />}>
              <Route path="/dashboard_encargado" element={<DashboardProfesional />}/>
              <Route path="/practicas" element={<Practicas />} />
              <Route path="/listaestudiantes/:careerId/:asignaturaId/:anio/:periodo" element={<ListaEstudiantes />}/>
              <Route path="/perfilEstudiante/:rut" element={<PerfilEstudiante />} />
              <Route path="/ins_pendientes" element={<InscripcionesPendientes />}/>
              <Route path="/centros_practicas" element={<CentrosPracticas />} />
              <Route path="/ingresar_empresa" element={<IngresarEmpresa />} />
              <Route path="/modificarEmpresa/:id" element={<ModificarEmpresa />}/>
              <Route path="/ofertapracticas" element={<OfertaPractica />} />
              <Route path="/crearoferta" element={<CrearOferta />} />
              <Route path="/modificaroferta/:id" element={<ModificarOferta />}/>
              <Route path="/detalleOfertas/:id" element={<DetalleOfertas />}/>
              <Route path="/informes_pendientes" element={<InformesPendientes />}/>
              <Route path="/evaluaciones_pendientes" element={<EvaluacionesPendientes />}/>
              <Route path="/bitacoras_alumnos/:id_inscripcion" element={<BitacorasAlumnos />}/>
              <Route path="/detalle_bitacora_alumno/:id_bitacora" element={<DetalleBitacoraAlumno />}/>
              <Route path="/visualizadorInformes/:id" element={<VisualizadorInformes />}/>
              <Route path="/visualizadorEvaluaciones/:id" element={<VisualizadorEvaluaciones />}/>
              <Route path="/aptitudes_pendientes" element={<AptitudesPendientes />}/>
              <Route path="/detalleCentroPractica/:id" element={<DetalleCentroPractica />}/>
            </Route>
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
