import React from "react";
import MUIDataTable from "mui-datatables";
import { useQuery } from "react-query";
import clienteAxios from "../../../../../helpers/clienteaxios";
import { CircularProgress, Grid, Alert } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const TableEmpresa = () => {
  const navigate = useNavigate();
  const { data, status, refetch } = useQuery("empresas", async () => {
    const response = await clienteAxios.get("/empresa/getall");
    return response.data;
  });

  const eliminarEmpresa = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, bórralo!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await clienteAxios.delete(`/empresa/delete/${id}`);
        if (response.status === 200) {
          Swal.fire({
            title: "Eliminado",
            text: "La empresa ha sido eliminada correctamente",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
          setTimeout(() => {
            refetch();
            Swal.close();
          }, 2000);
        } else {
          Swal.fire({
            title: "Error",
            text: "Ha ocurrido un error al eliminar la empresa",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
      }
    });
  };

  const columns = [
    { name: "id_empresa", label: "ID Empresa" },
    { name: "rut_empresa", label: "Rut" },
    { name: "razon_social", label: "Razón Social" },
    { name: "direccion", label: "Dirección" },
    {
      name: "centro_practica",
      label: "Centro Práctica",
      options: { customBodyRender: (value) => (value ? "Sí" : "No") },
    },
    { name: "correo", label: "Correo" },
    { name: "telefono", label: "Teléfono" },
    {
      name: "comuna",
      label: "Comuna",
      options: { customBodyRender: (value) => value.nombre },
    },
    {
      name: "estado_empresa",
      label: "Estado",
      options: { customBodyRender: (value) => value.nombre_estado_empresa },
    },
    {
      name: "acciones",
      label: "Acciones",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const id = tableMeta.rowData[0];
          return (
            <>
              <EditIcon
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/modificarEmpresa/${id}`)}
              />
              <DeleteIcon
                style={{ cursor: "pointer", marginLeft: "10px" }}
                onClick={() => eliminarEmpresa(id)}
              />
            </>
          );
        },
      },
    },
  ];

  const options = {
    responsive: "standard",
    search: false,
    download: false,
    print: false,
    viewColumns: false,
    filter: false,
    pagination: false,
    selectableRows: "none", // Desactiva la selección múltiple
  };

  if (status === "loading") {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  if (status === "success" && data.empresas.length === 0) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <Alert severity="error">No hay empresas registradas</Alert>
      </Grid>
    );
  }

  if (status === "success" && data.empresas.length > 0) {
    return (
      <MUIDataTable
        title={"Lista de Empresas"}
        data={data.empresas}
        columns={columns}
        options={options}
      />
    );
  }

  return null;
};

export default TableEmpresa;
