import { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Typography,
  Card,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Header from "../../../components/headers/header";
import SidebarProfesional from "../../../components/sidebars/sidebarProfesional";
import { useNavigate } from "react-router-dom";
import { Business } from "@mui/icons-material";
import clienteAxios from "../../../helpers/clienteaxios"; // Ajusta la ruta según la ubicación de clienteAxios
import MUIDataTable from "mui-datatables";

const Convenios = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [year, setYear] = useState("2024"); // Valor por defecto
  const [convenios, setConvenios] = useState([]);
  const [filteredConvenios, setFilteredConvenios] = useState([]);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      const zoomThreshold = 900;
      setIsWideScreen(window.innerWidth >= zoomThreshold);
      setSidebarOpen(window.innerWidth < zoomThreshold ? false : true);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Fetch data when the year changes
    const fetchConvenios = async () => {
      try {
        const response = await clienteAxios.get(`/sp/convenios/${year}`);
        setConvenios(response.data);
      } catch (error) {
        console.error("Error fetching convenios:", error);
      }
    };

    fetchConvenios();
  }, [year]);

  useEffect(() => {
    // Filter convenios based on the con_nombre field
    const filtered = convenios.filter((convenio) =>
      convenio.con_nombre.toLowerCase().includes("práctica".toLowerCase())
    );
    setFilteredConvenios(filtered);
  }, [convenios]);

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const columns = [
    {
      name: "con_codigo",
      label: "Código",
      options: {
        display: "excluded",
      },
    },
    { name: "tic_nombre", label: "Tipo" },
    { name: "con_nombre", label: "Nombre" },
    { name: "con_fecha_inicio", label: "Fecha Inicio" },
    { name: "con_fecha_termino", label: "Fecha Término" },
    { name: "con_descripcion", label: "Descripción" },
  ];

  // Function to generate a list of years from 2000 to the current year
  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 2000; year <= currentYear; year++) {
      years.push(year);
    }
    return years;
  };

  return (
    <Grid
      container
      direction="column"
      sx={{ backgroundColor: "#e8e9eb", minHeight: "100vh" }}
    >
      <Grid
        item
        sx={{ position: "sticky", top: 0, zIndex: 1000, width: "100%" }}
      >
        <Header
          toggleSidebar={toggleSidebar}
          isWideScreen={isWideScreen}
          showSidebarButton={true}
        />
      </Grid>

      <Grid container item>
        {sidebarOpen && (
          <Grid
            item
            sx={{
              position: "fixed",
              top: "80px",
              left: 0,
              width: "250px",
              zIndex: 1200,
              backgroundColor: "#36465d",
            }}
          >
            <SidebarProfesional />
          </Grid>
        )}

        <Grid
          item
          xs
          sx={{
            marginLeft: sidebarOpen && isWideScreen ? "250px" : "0px",
            transition: "margin-left 0.3s",
            overflowY: "auto",
            paddingRight: "16px",
            overflowX: "auto",
            marginTop: "16px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Card
            sx={{
              padding: "20px",
              backgroundColor: "white",
              width: "100%",
              marginBottom: "15px",
              marginLeft: "16px",
            }}
          >
            <Grid
              container
              spacing={2}
              sx={{ flexDirection: "column", alignItems: "center" }}
            >
              <Grid item>
                <Typography
                  variant="h5"
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Convenios
                  <Business style={{ marginLeft: "5px" }} />
                </Typography>
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <FormControl fullWidth>
                  <InputLabel>Año de inicio</InputLabel>
                  <Select
                    value={year}
                    onChange={handleYearChange}
                    label="Año de inicio"
                  >
                    {generateYearOptions().map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sx={{ width: "100%", marginTop: "20px" }}>
                <MUIDataTable
                  title={"Convenios"}
                  data={filteredConvenios}
                  columns={columns}
                  options={{
                    responsive: "standard",
                    search: false,
                    download: false,
                    print: false,
                    viewColumns: false,
                    filter: false,
                    pagination: false,
                    selectableRows: "none",
                    sort: false,
                    textLabels: {
                      body: {
                        noMatch:
                          "No hay datos disponibles, seleccione otro año", // Mensaje en español cuando no hay datos
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Convenios;
