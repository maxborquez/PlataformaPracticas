import React from "react";
import { List, ListItem, ListItemText, Collapse } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import clienteAxios from "../../helpers/clienteaxios";
import { Output, ArrowDropDown } from "@mui/icons-material";
import Swal from "sweetalert2";

const SidebarAlumno = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const id_alumno = localStorage.getItem("id_alumno");
  const comprobar = useQuery("update_inscripcion", async () => {
    const response = await clienteAxios.post("/inscripcion/comprobar", {
      id_alumno: id_alumno,
    });
    if (response.status === 200) {
      localStorage.setItem(
        "id_inscripcion_practica",
        response.data.id_inscripcion
      );
      return response.data;
    }
  });

  const handleDropdown = () => {
    setOpen(!open);
  };

  const logout = () => {
    setOpen(false);
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
      <ListItem button onClick={() => navigate("/perfil")}>
        <ListItemText sx={{ textAlign: "center" }} primary="Perfil" />
      </ListItem>
      <ListItem button onClick={() => navigate("/mi_practica")}>
        <ListItemText sx={{ textAlign: "center" }} primary="Mi práctica" />
      </ListItem>
      <ListItem button onClick={() => navigate("/ofertas_publicas")}>
        <ListItemText
          sx={{ textAlign: "center" }}
          primary="Ofertas de practica"
        />
      </ListItem>

      <ListItem button onClick={() => navigate("/inscripcionpractica/${id_inscribe}")}>
        <ListItemText
          sx={{ textAlign: "center" }}
          primary="Inscribir práctica"
        />
      </ListItem>

      <ListItem
        button
        onClick={handleDropdown}
        sx={{
          textAlign: "center", // Mantener la alineación centrada
          "&:hover": {
            backgroundColor: open ? "#425063" : "", // Cambiar el color de fondo en hover si está abierto
            color: open ? "white" : "", // Cambiar el color del texto en hover si está abierto
          },
        }}
      >
        <ListItemText primary="&nbsp;&nbsp;&nbsp;&nbsp;Documentos" />
        <ArrowDropDown />
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            onClick={() =>
              navigate(`/bitacoras/${comprobar.data.id_inscripcion}`)
            }
            sx={{
              textAlign: "center",
              backgroundColor: "#495970", // Cambiar color de fondo a gris claro
              color: "white", // Cambiar color de texto a negro
              "&:hover": {
                backgroundColor: "#425063", // Mantener el color de fondo constante en hover
              },
            }}
          >
            <ListItemText primary="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bitácoras&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" />
          </ListItem>
          <ListItem
            button
            onClick={() => navigate(`/archivo_inscripcion/${comprobar.data.id_inscripcion}`)}
            sx={{
              textAlign: "center",
              backgroundColor: "#495970", // Cambiar color de fondo a gris claro
              color: "white", // Cambiar color de texto a negro
              "&:hover": {
                backgroundColor: "#425063", // Mantener el color de fondo constante en hover
              },
            }}
          >
            <ListItemText primary="Archivo de inscripcion" />
          </ListItem>
          <ListItem
            button
            onClick={() => navigate(`/informe/${comprobar.data.id_inscripcion}`)}
            sx={{
              textAlign: "center",
              backgroundColor: "#495970", // Cambiar color de fondo a gris claro
              color: "white", // Cambiar color de texto a negro
              "&:hover": {
                backgroundColor: "#425063", // Mantener el color de fondo constante en hover
              },
            }}
          >
            <ListItemText primary="Informe de practica" />
          </ListItem>
          <ListItem
            button
            onClick={() => navigate(`/evaluacion/${comprobar.data.id_inscripcion}`)}
            sx={{
              textAlign: "center",
              backgroundColor: "#495970", // Cambiar color de fondo a gris claro
              color: "white", // Cambiar color de texto a negro
              "&:hover": {
                backgroundColor: "#425063", // Mantener el color de fondo constante en hover
              },
            }}
          >
            <ListItemText primary="Evaluación de Empresa" />
          </ListItem>
        </List>
      </Collapse>

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

export default SidebarAlumno;
