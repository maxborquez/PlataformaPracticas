import React from "react";
import { Card, Typography, Box, Button } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useNavigate } from "react-router-dom";

const CardBitacora = ({ bitacora }) => {
  const navigate = useNavigate();

  const handleVerMas = () => {
    navigate(`/detalle_bitacora/${bitacora.id_bitacora}`);
  };

  const formatFechaUTC = (fecha) => {
    const date = new Date(fecha);
    return `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;
  };

  return (
    <Card
      sx={{
        width: "250px",
        marginTop: "15px",
        marginBottom: "15px",
        marginLeft: "16px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        overflow: "hidden",
        transition: "border 0.3s",
        "&:hover": {
          border: "1px solid black",
        },
      }}
    >
      <Box
        sx={{
          backgroundColor: "#326FA6",
          color: "white",
          padding: "5px",
          paddingLeft: "16px",
          textAlign: "left",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {bitacora.titulo}
        </Typography>
      </Box>
      <Box sx={{ padding: "16px" }}>
        <Typography variant="body2" sx={{ marginBottom: "10px" }}>
          Fecha: {formatFechaUTC(bitacora.fecha_creacion)}
        </Typography>
        <Box
          sx={{
            height: "15px",
            display: "inline-flex",
            alignItems: "center",
            padding: "4px 8px",
            borderRadius: "4px",
            backgroundColor:
              bitacora.estado_bitacora.nombre_estado_bitacora === "sin revisar"
                ? "rgba(244, 67, 54, 0.7)"
                : "rgba(76, 175, 80, 0.7)",
            color: "white",
          }}
        >
          <Typography
            variant="body1"
            sx={{ marginBottom: "1px", fontWeight: "bold", marginRight: "8px" }}
          >
            {bitacora.estado_bitacora.nombre_estado_bitacora}
          </Typography>
          {bitacora.estado_bitacora.nombre_estado_bitacora === "sin revisar" ? (
            <RemoveCircleOutlineIcon />
          ) : (
            <CheckCircleOutlineIcon />
          )}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: "10px",
          paddingBottom: "10px",
          paddingTop: "1px",
        }}
      >
        <Button size="small" variant="contained" color="primary" onClick={handleVerMas}>
          Ver más
        </Button>
      </Box>
    </Card>
  );
};

export default CardBitacora;
