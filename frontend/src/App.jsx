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
import BitAlumnoRender from "./pages/Alumno/BitacoraAlumno/CreateBitacoAlumno/BitaAlumnoRender";
import RenderBitaAlumno from "./pages/Alumno/BitacoraAlumno/ShowBitaAlum/RenderBitaAlumno";
import RenderDetailsAlumno from "./pages/Alumno/BitacoraAlumno/DetailsAlumno/RenderDetailsAlumno";
import EditingBitAlumno from "./pages/Alumno/BitacoraAlumno/ModificarAlumno/EditingBitAlumno";
import InscripcionPractica from "./pages/Alumno/inscripcion_practica/inscripcionPractica";
import CentrosPracticas from "./pages/ProfesionalApoyo/empresas/centros_practicas";
import ModificarEmpresa from "./pages/ProfesionalApoyo/empresas/modificar_empresa";
import OfertaPractica from "./pages/ProfesionalApoyo/ofertas_practica/ofertapractica";
import CrearOferta from "./pages/ProfesionalApoyo/ofertas_practica/components/crear_oferta";
import ModificarOferta from "./pages/ProfesionalApoyo/ofertas_practica/components/modificarOferta";
import BitacorasAlumno from "./pages/ProfesionalApoyo/bitacoras_alumno/bitacorasAlumno";
import DetalleBitacora from "./pages/ProfesionalApoyo/bitacoras_alumno/detalleBitacora";
import VisualizadorDocumento from "./pages/Alumno/documentos/visualizadorDocumento";
import IngresarEmpresa from "./pages/ProfesionalApoyo/empresas/ingresar_empresa";
import InscripcionesPendientes from "./pages/ProfesionalApoyo/inscripciones_pendientes/ins_pendientes";
import Practicas from "./pages/ProfesionalApoyo/practicas/practicas";
import MiPractica from "./pages/Alumno/mi_practica/mi_practica";
import InformePractica from "./pages/Alumno/informe/informe";
import EvaluacionPractica from "./pages/Alumno/evaluacion/evaluacion";
import ListaEstudiantes from "./pages/ProfesionalApoyo/practicas/lista_estudiantes";
import DetalleOfertas from "./pages/ProfesionalApoyo/ofertas_practica/components/detalleOfertas";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes>
            <Route path="/" index element={<Login />} />
            <Route
              path="/visualizador/:id"
              element={<VisualizadorDocumento />}
            />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard_alumno" element={<DashboardAlumno />} />
              <Route path="/ofertas_publicas" element={<OfertasPublicas />} />
              <Route path="/perfil" element={<PerfilAlumno />} />
              <Route path="/mi_practica" element={<MiPractica />} />
              <Route
                path="/detalleoferta/:id"
                element={<DetalleOfertaPractica />}
              />
              <Route
                path="/inscripcionpractica/:id"
                element={<InscripcionPractica />}
              />
              <Route
                path="/modificarinscripcion/:id"
                element={<ModificarDatos />}
              />
              <Route path="/informe/:id" element={<InformePractica />} />
              <Route path="/evaluacion/:id" element={<EvaluacionPractica />} />
              <Route
                path="/documentosinscripcion/:id"
                element={<DocumentosInscripcion />}
              />
              <Route path="/bitacoralumno" element={<BitAlumnoRender />} />
              <Route path="/showbitalumno/:id" element={<RenderBitaAlumno />} />
              <Route
                path="/detailsbitacoralumno/:id"
                element={<RenderDetailsAlumno />}
              />
              <Route
                path="/modificarbitacoralumno/:id"
                element={<EditingBitAlumno />}
              />
            </Route>
            <Route element={<ProtectedRouteProfesional />}>
              <Route
                path="/dashboard_encargado"
                element={<DashboardProfesional />}
              />
              <Route path="/practicas" element={<Practicas />} />
              <Route
                path="/listaestudiantes/:careerId/:asignaturaId/:anio/:periodo"
                element={<ListaEstudiantes />}
              />
              <Route
                path="/ins_pendientes"
                element={<InscripcionesPendientes />}
              />
              <Route path="/centros_practicas" element={<CentrosPracticas />} />
              <Route path="/ingresar_empresa" element={<IngresarEmpresa />} />
              <Route
                path="/modificarEmpresa/:id"
                element={<ModificarEmpresa />}
              />
              <Route path="/ofertapracticas" element={<OfertaPractica />} />
              <Route path="/crearoferta" element={<CrearOferta />} />
              <Route
                path="/modificaroferta/:id"
                element={<ModificarOferta />}
              />

              <Route path="/bitacoras/:id" element={<BitacorasAlumno />} />
              <Route
                path="/detallebitacora/:id"
                element={<DetalleBitacora />}
              />
              <Route
                path="/detalleOfertas/:id"
                element={<DetalleOfertas />}
              />
            </Route>
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
