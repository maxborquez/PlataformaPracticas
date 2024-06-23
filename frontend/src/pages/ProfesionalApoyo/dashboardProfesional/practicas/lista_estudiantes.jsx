import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import Header from "../../../../components/headers/header";
import SidebarProfesional from "../../../../components/sidebars/sidebarProfesional";
import MUIDataTable from "mui-datatables";
import clienteAxios from '../../../../helpers/clienteaxios';

const ListaEstudiantes = () => {
  const { careerId, asignaturaId, anio, periodo } = useParams();
  const [data, setData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const zoomThreshold = 900;
      setIsWideScreen(window.innerWidth >= zoomThreshold);
      setSidebarOpen(window.innerWidth >= zoomThreshold);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await clienteAxios.get(`/inscripcion/listaestudiantes/${careerId}/${asignaturaId}/${anio}/${periodo}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [careerId, asignaturaId, anio, periodo]);

  const columns = [
    { name: "rut", label: "RUT" },
    { name: "primer_nombre", label: "Primer Nombre" },
    { name: "segundo_nombre", label: "Segundo Nombre" },
    { name: "apellido_paterno", label: "Apellido Paterno" },
    { name: "apellido_materno", label: "Apellido Materno" },
    { name: "correo_institucional", label: "Correo Institucional" },
  ];

  const options = {
    responsive: "standard",
    search: false,
    download: false,
    print: false,
    viewColumns: false,
    filter: false,
    pagination: false,
    selectableRows: "none",
    sort: false,
  };

  return (
    <Grid container direction="column" sx={{ backgroundColor: "#e8e9eb", minHeight: "100vh" }}>
      <Grid item sx={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} isWideScreen={isWideScreen} showSidebarButton={true} />
      </Grid>
      <Grid container>
        {sidebarOpen && (
          <Grid item xs={3} sx={{ position: "fixed", top: "80px", zIndex: 1200 }}>
            <SidebarProfesional />
          </Grid>
        )}
        <Grid
          item
          xs={12}
          sx={{
            marginLeft: sidebarOpen && isWideScreen ? "250px" : "0px",
            transition: "margin-left 0.3s",
            padding: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card sx={{ padding: "20px", backgroundColor: "white", width: "100%", marginTop: "15px", marginBottom: "15px" }}>
            <Typography variant="h5" sx={{ marginTop: "10px", marginBottom: "10px", fontSize: { xs: "1.3rem", sm: "1.4rem" }, textAlign: "center" }}>
              Lista de Estudiantes
            </Typography>
            <MUIDataTable
              title={"Estudiantes"}
              data={data}
              columns={columns}
              options={options}
            />
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ListaEstudiantes;
