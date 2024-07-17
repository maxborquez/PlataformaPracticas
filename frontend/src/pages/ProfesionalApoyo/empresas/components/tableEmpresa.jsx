import React from "react";
import MUIDataTable from "mui-datatables";
import { useQuery } from "react-query";
import clienteAxios from "../../../../helpers/clienteaxios";
import { CircularProgress, Grid, Alert } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";

const TableEmpresa = () => {
  const navigate = useNavigate();
  const { data, status, refetch } = useQuery("empresas", async () => {
    const response = await clienteAxios.get("/empresa/getall");
    if (response.data && Array.isArray(response.data.empresas)) {
      // Filtrar empresas con estado_empresa: 2
      const empresasFiltradas = response.data.empresas.filter(
        (empresa) => empresa.id_estado_empresa === 2
      );
      return { empresas: empresasFiltradas };
    } else {
      return { empresas: [] };
    }
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
    {
      name: "id_empresa",
      label: "ID Empresa",
      options: {
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "#fff",
          },
        }),
      },
    },
    {
      name: "nombre",
      label: "Nombre",
      options: {
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "#fff",
          },
        }),
      },
    },
    {
      name: "departamento",
      label: "Departamento",
      options: {
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "#fff",
          },
        }),
      },
    },
    {
      name: "web",
      label: "Sitio Web",
      options: {
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "#fff",
          },
        }),
      },
    },
    {
      name: "rubro",
      label: "Rubro",
      options: {
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "#fff",
          },
        }),
      },
    },
    {
      name: "direccion",
      label: "Dirección",
      options: {
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "#fff",
          },
        }),
      },
    },
    {
      name: "telefono",
      label: "Teléfono",
      options: {
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "#fff",
          },
        }),
      },
    },
    {
      name: "comuna",
      label: "Comuna",
      options: {
        customBodyRender: (value) => value.nombre,
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "#fff",
          },
        }),
      },
    },
    {
      name: "acciones",
      label: "Acciones",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const id = tableMeta.rowData[0];
          return (
            <>
              <VisibilityIcon
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/detalleCentroPractica/${id}`)}
              />
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
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#326fa6",
            color: "#fff",
          },
        }),
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
    selectableRows: "none",
    sort: false,
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

  if (
    status === "success" &&
    data &&
    data.empresas &&
    data.empresas.length === 0
  ) {
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

  if (
    status === "success" &&
    data &&
    data.empresas &&
    data.empresas.length > 0
  ) {
    return (
      <MUIDataTable data={data.empresas} columns={columns} options={options} />
    );
  }

  return null;
};

export default TableEmpresa;
