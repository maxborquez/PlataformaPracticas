import { useState } from "react";
import {
  Alert,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CircularProgress,
  Collapse,
  Button,
} from "@mui/material";
import { useQuery } from "react-query";
import clienteAxios from "../../../helpers/clienteaxios";
import { useNavigate } from "react-router-dom";

const OfertasPracticas = () => {
  const navigate = useNavigate();
  const { data, status, error } = useQuery("ofertas", async () => {
    const response = await clienteAxios.get("/oferta/getall");
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Error fetching data");
    }
  });

  const [expanded, setExpanded] = useState({});

  const handleExpandClick = (id) => {
    setExpanded((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  if (status === "loading") {
    return (
      <Grid
        sx={{
          width: "35%",
          margin: "0px auto",
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Cargando datos.........
        <CircularProgress />
      </Grid>
    );
  }

  if (status === "error") {
    return (
      <Grid
        sx={{
          width: "40%",
          margin: "0px auto",
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Alert severity="error">
          Error al cargar las ofertas: {error.message}
        </Alert>
      </Grid>
    );
  }

  if (status === "success" && data && data.ofertas && data.ofertas.length > 0) {
    return (
      <Grid container spacing={2} sx={{ padding: "20px" }}>
        {data.ofertas.map((oferta) => (
          <Grid item key={oferta.id_oferta_practica} xs={12} sm={6} md={4}>
            <Card
              sx={{
                background: "linear-gradient(180deg, #c8e4ff 0%, #e1eaf7 100%)", // Degradado
                padding: "10px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                height: "250px",
                transition: "border 0.3s",
                "&:hover": {
                  border: "1px solid black",
                },
              }}
            >
              <CardActionArea
                sx={{
                  height: "100%",
                  width: "100%",
                }}
                onClick={() =>
                  navigate(`/detalleoferta/${oferta.id_oferta_practica}`)
                }
              >
                <CardContent>
                  <Typography variant="h5" color="textSecondary">
                    {oferta.empresa.razon_social}
                  </Typography>
                  <Typography variant="h5" sx={{ marginBottom: "8px" }}>
                    {oferta.titulo}
                  </Typography>
                  <Typography variant="body2" noWrap>
                    {oferta.descripcion}
                  </Typography>
                  <Collapse
                    in={expanded[oferta.id_oferta_practica]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Typography variant="body2">
                      <strong>Modalidad:</strong>{" "}
                      {oferta.modalidad.nombre_modalidad}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Experiencia laboral:</strong>{" "}
                      {oferta.experiencia_laboral ? "Sí" : "No"}
                    </Typography>
                  </Collapse>
                  <Button
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExpandClick(oferta.id_oferta_practica);
                    }}
                  >
                    {expanded[oferta.id_oferta_practica]
                      ? "Ver menos"
                      : "Ver más"}
                  </Button>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid
      sx={{
        width: "40%",
        margin: "0px auto",
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Alert severity="error">No hay ofertas publicadas</Alert>
    </Grid>
  );
};

export default OfertasPracticas;
