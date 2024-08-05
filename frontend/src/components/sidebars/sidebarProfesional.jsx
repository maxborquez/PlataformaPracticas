import React, { useState } from "react";
import { List, ListItem, ListItemText, Collapse } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Output, ArrowDropDown } from "@mui/icons-material";
import Swal from "sweetalert2";

const SidebarProfesional = () => {
  const [empresaOpen, setEmpresaOpen] = useState(false);
  const navigate = useNavigate();

  const handleEmpresaDropdown = () => {
    setEmpresaOpen(!empresaOpen);
  };

  const logout = () => {
    setEmpresaOpen(false);
    Swal.fire("Cerrando sesión", "redireccionando...", "success");
    setTimeout(() => {
      Swal.close();
      navigate("/");
    }, 2000);
  };

  return (
    <List
      sx={{
        width: "250px",
        backgroundColor: "#36465d",
        color: "white",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "fixed",
      }}
    >
      <ListItem button onClick={() => navigate("/practicas")}>
        <ListItemText sx={{ textAlign: "center" }} primary="Prácticas" />
      </ListItem>

      <ListItem button onClick={() => navigate("/ofertapracticas")}>
        <ListItemText
          primary="Ofertas de Práctica"
          sx={{
            textAlign: "center",
            display: "flex",
            flexWrap: "nowrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></ListItemText>
      </ListItem>

      <ListItem button onClick={() => navigate("/ins_pendientes")}>
        <ListItemText
          sx={{ textAlign: "center" }}
          primary="Inscripciones pendientes"
        />
      </ListItem>

      <ListItem button onClick={() => navigate("/centros_practicas")}
      >
        <ListItemText
        sx={{ textAlign: "center" }}
        primary="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Centros de práctica&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" />
      </ListItem>

      <ListItem
        button
        onClick={handleEmpresaDropdown}
        sx={{
          textAlign: "center",
        }}
      >
        <ListItemText primary="Documentos a revisar" />
        <ArrowDropDown />
      </ListItem>
      <Collapse in={empresaOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            onClick={() => navigate("/informes_pendientes")}
            sx={{
              textAlign: "center",
              backgroundColor: "#495970",
              color: "white",
              "&:hover": {
                backgroundColor: "#425063",
                color: "white",
              },
            }}
          >
            <ListItemText primary="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Informes&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" />
          </ListItem>
        </List>
        <List component="div" disablePadding>
          <ListItem
            button
            onClick={() => navigate("/evaluaciones_pendientes")}
            sx={{
              textAlign: "center",
              backgroundColor: "#495970",
              color: "white",
              "&:hover": {
                backgroundColor: "#425063",
                color: "white",
              },
            }}
          >
            <ListItemText primary="Evaluaciones" />
          </ListItem>

        </List>
      </Collapse>

      <ListItem button onClick={() => navigate("/aptitudes_pendientes")}>
        <ListItemText sx={{ textAlign: "center" }} primary="Aptitudes pendientes" />
      </ListItem>

      <ListItem button onClick={() => navigate("/rangoInscripcion")}>
        <ListItemText sx={{ textAlign: "center" }} primary="Rango de inscripcion" />
      </ListItem>

      <ListItem button onClick={logout}>
        <ListItemText
          sx={{
            textAlign: "center",
            display: "flex",
            flexWrap: "nowrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p> Cerrar Sesión</p> <Output />
        </ListItemText>
      </ListItem>
    </List>
  );
};

export default SidebarProfesional;
