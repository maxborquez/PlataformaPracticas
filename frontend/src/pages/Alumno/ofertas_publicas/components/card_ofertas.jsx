import {
  Alert,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CircularProgress,
  Button,
  Chip,
} from "@mui/material";
import { useQuery } from "react-query";
import clienteAxios from "../../../../helpers/clienteaxios";
import { useNavigate } from "react-router-dom";

const CardOfertas = () => {
  const navigate = useNavigate();
  const { data, status, error } = useQuery("ofertas", async () => {
    const response = await clienteAxios.get("/oferta/getall");
    console.log(response.data);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Error fetching data");
    }
  });

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
                position: "relative",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                height: "280px",
                width: "350px",
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
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#326FA6",
                    color: "white",
                    width: "100%",
                    textAlign: "left",
                    padding: "16px 16px",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    borderRadius: "4px 4px 0 0",
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {oferta.empresa.razon_social}
                  </Typography>
                </div>
                <CardContent
                  sx={{
                    padding: "70px 16px 16px 16px",
                    marginLeft: "16px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "100%",
                    height: "100%",
                    marginTop: "30px",
                  }}
                >
                  <div>
                    <Typography variant="body1" sx={{ marginBottom: "20px" }}>
                      {oferta.descripcion.length > 50
                        ? `${oferta.descripcion.substring(0, 50)}...`
                        : oferta.descripcion}
                    </Typography>
                  </div>
                  <div>
                    <Chip
                      label={oferta.modalidad.nombre_modalidad}
                      sx={{
                        backgroundColor: "#4caf50",
                        color: "white",
                        marginRight: "8px",
                      }}
                    />
                    <Chip
                      label={oferta.empresa.comuna.nombre}
                      sx={{
                        backgroundColor: "#2196f3",
                        color: "white",
                        marginRight: "8px",
                      }}
                    />
                    <Chip
                      label={`${oferta.cupos} cupos`}
                      sx={{
                        backgroundColor: "#ffce3a",
                        color: "white",
                      }}
                    />
                  </div>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/detalleoferta/${oferta.id_oferta_practica}`);
                    }}
                    sx={{ alignSelf: "flex-end", marginTop: "5px", marginRight: "16px" }}
                  >
                    Ver más
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

export default CardOfertas;
