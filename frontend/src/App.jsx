import { useContext, useState } from 'react'
import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Route, Routes, useRoutes } from 'react-router-dom'
import { AuthContext, AuthProvider } from './context/AuthContext'
import Login from './pages/login/login'
import DashboardAlumno from './pages/Alumno/DashboardAlumno'
import OfertasPublicas from "./pages/Alumno/ofertas_publicas/ofertas_publicas";
import PublicRoutes from './router/publicRoutes'
import PrivateRoutes from './router/privateRoutes'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ProtectedRoute } from './router/ProtectedRoute'

import { ProtectedRouteProfesional } from './router/protectedrouteprofesional'
import DashboardProfesional from './pages/ProfesionalApoyo/dashboardProfesional/DashboardProfesional'
import PerfilAlumno from './pages/Alumno/perfil-alumno/PerfilAlumno'
import DetalleOfertaPractica from './pages/Alumno/detalleofertapractica/detalleofertapractica'
import DetalleInscripcion from './pages/Alumno/detalleInscripcion/DetalleInscripcion'
import ModificarDatos from './pages/Alumno/inscripcion_practica/modificarDatos'
import DocumentosInscripcion from './pages/Alumno/documentos/documentosInscripcion'
import ArchivosBitacoras from './pages/Alumno/archivos_bitacora/Archivos_bitacoras'
import ImagenesBitacoras from './pages/Alumno/imagenesBitacora/imageneBitacoras'
import Aptitudes from './pages/Alumno/aptitudes/aptitudes'
import BitAlumnoRender from './pages/Alumno/BitacoraAlumno/CreateBitacoAlumno/BitaAlumnoRender'
import RenderBitaAlumno from './pages/Alumno/BitacoraAlumno/ShowBitaAlum/RenderBitaAlumno'
import RenderDetailsAlumno from './pages/Alumno/BitacoraAlumno/DetailsAlumno/RenderDetailsAlumno'
import EditingBitAlumno from './pages/Alumno/BitacoraAlumno/ModificarAlumno/EditingBitAlumno'
import InscripcionPractica from './pages/Alumno/inscripcion_practica/inscripcionPractica'
import CentrosPracticas from './pages/ProfesionalApoyo/dashboardProfesional/empresas/centros_practicas'
import ModificarEmpresa from './pages/ProfesionalApoyo/dashboardProfesional/empresas/modificar_empresa'
import OfertaPractica from './pages/ProfesionalApoyo/dashboardProfesional/ofertas_practica/ofertapractica'
import CrearOferta from './pages/ProfesionalApoyo/dashboardProfesional/ofertas_practica/components/crear_oferta'
import ModificarOferta from './pages/ProfesionalApoyo/dashboardProfesional/ofertas_practica/components/modificarOferta'
import EstadoPracticas from './pages/ProfesionalApoyo/dashboardProfesional/estado_practicas/estado_practicas'
import InformacionGeneral from './pages/ProfesionalApoyo/dashboardProfesional/estado_practicas/informacion_general_practica'
import VerDocumentosInscripcion from './pages/ProfesionalApoyo/dashboardProfesional/estado_practicas/verdocumentosinscripcion'
import EvaluarPractica from './pages/ProfesionalApoyo/dashboardProfesional/estado_practicas/evaluarPractica'
import AptitudesAlumno from './pages/ProfesionalApoyo/dashboardProfesional/aptitudes_alumno/AptitudesAlumno'
import BitacorasAlumno from './pages/ProfesionalApoyo/dashboardProfesional/bitacoras_alumno/bitacorasAlumno'
import DetalleBitacora from './pages/ProfesionalApoyo/dashboardProfesional/bitacoras_alumno/detalleBitacora'
import VerArchivos from './pages/ProfesionalApoyo/dashboardProfesional/bitacoras_alumno/verArchivos'
import VerImagenes from './pages/ProfesionalApoyo/dashboardProfesional/bitacoras_alumno/verImagenes'
import VisualizadorDocumento from './pages/Alumno/documentos/visualizadorDocumento'
import VisualizadorDocumentosInscripcion from './pages/ProfesionalApoyo/dashboardProfesional/estado_practicas/visualizadorDocumentos'
import VisualizadorDocumentoBitacora from './pages/Alumno/archivos_bitacora/visualizador_archivo_bitacora'
import IngresarEmpresa from "./pages/ProfesionalApoyo/dashboardProfesional/empresas/ingresar_empresa";
import EmpresaAlumno from "./pages/Alumno/empresa/empresa_alumno";
import InscripcionesPendientes from "./pages/ProfesionalApoyo/dashboardProfesional/inscripciones_pendientes/ins_pendientes";
import Practicas from './pages/ProfesionalApoyo/dashboardProfesional/practicas/practicas'
import EmpresasPendientes from './pages/ProfesionalApoyo/dashboardProfesional/empresas/emp_pendientes'

const queryClient = new QueryClient();

function App() {
    
    
    return(
      <BrowserRouter>
        <QueryClientProvider client={queryClient} >
          
              <AuthProvider>
                     <Routes>
                            <Route path='/' index element={<Login/>} />
                             <Route path='/visualizadorbitacora/:id' element={<VisualizadorDocumentoBitacora/>} />
                             <Route path='/visualizador/:id' element={<VisualizadorDocumento/>}/>
                             <Route element={<ProtectedRoute />}>
                                <Route path="/dashboard_alumno" element={<DashboardAlumno/>} />
                                <Route path="/ofertas_publicas" element={<OfertasPublicas/>} />
                                <Route path="/perfil" element={<PerfilAlumno/>} />
                                <Route path="/detalleoferta/:id" element={<DetalleOfertaPractica/>} />
                                <Route path="/detalleinscripcion/:id" element={<DetalleInscripcion/>}/>
                                <Route path="/inscripcionpractica/:id" element={<InscripcionPractica/>} />
                            
                                <Route path="/modificarinscripcion/:id" element={<ModificarDatos/>} />
                                <Route path="/documentosinscripcion/:id" element={<DocumentosInscripcion/>} />
                                <Route path="/archivosbitacora/:id" element ={<ArchivosBitacoras/>} />
                                <Route path="/imagenesbitacora/:id" element={<ImagenesBitacoras/>} />
                                <Route path="/aptitudes" element={<Aptitudes/>} />
                                <Route path="/bitacoralumno" element={<BitAlumnoRender />} />
                                <Route path="/showbitalumno/:id" element={<RenderBitaAlumno/>} />
                                <Route path="/detailsbitacoralumno/:id" element={<RenderDetailsAlumno/>} />
                                <Route path="/modificarbitacoralumno/:id" element={<EditingBitAlumno/>} />
                                
                            </Route>  
                            <Route element={<ProtectedRouteProfesional/>}>
                          
                                <Route path="/dashboard_encargado" element={<DashboardProfesional/>} />
                                <Route path="/practicas" element={<Practicas/>} />
                                <Route path="/ins_pendientes" element={<InscripcionesPendientes/>} />
                                <Route path="/empresas_pendientes" element={<EmpresasPendientes/>} />
                                <Route path="/centros_practicas" element={<CentrosPracticas/>} />
                                <Route path="/ingresar_empresa" element={<IngresarEmpresa/>} />
                                <Route path="/modificarEmpresa/:id" element={<ModificarEmpresa/>} />
                                <Route path="/ofertapracticas" element={<OfertaPractica/>} />
                                <Route path="/crearoferta" element={<CrearOferta/>} />
                                <Route path="/modificaroferta/:id" element={<ModificarOferta/>} />
                                <Route path="/estadopracticas/:anio/:periodo/:asignatura/:carrera" element={<EstadoPracticas/>}/>
                                <Route path="/informaciongeneral/:inscribe" element={<InformacionGeneral/>} />
                                <Route path="/documentosinscripcionpractica/:id" element={<VerDocumentosInscripcion/>} />

                                <Route path="/evaluarinscripcion/:id" element={<EvaluarPractica/>} />
                                <Route path="/aptitudes/:id" element={<AptitudesAlumno/>} />
                                <Route path="/bitacoras/:id" element={<BitacorasAlumno/>} />
                                <Route path="/detallebitacora/:id" element={<DetalleBitacora/>} />
                                <Route path='/verarchivobitacoras/:id' element={<VerArchivos/>} />
                                <Route path='/verimagenesbitacoras/:id' element={<VerImagenes/>} />
                                <Route path='/visualizadordocumento/:id' element={<VisualizadorDocumentosInscripcion/>} />
                            </Route>
                        
                     </Routes>
                   
              </AuthProvider>
           
          </QueryClientProvider>
         
        </BrowserRouter>
      )
 
   
}

export default App
