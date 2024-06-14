import { useQuery } from "react-query";
import { CircularProgress, Grid, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import { Person } from "@mui/icons-material";
import clienteAxios from "../../../../helpers/clienteaxios";

const DataAlumno = () => {
    const rut = localStorage.getItem("rut");

    const { data, status } = useQuery("datospersonales", async () => {
        const response = await clienteAxios.post("/alumno/show", {
            rut: rut
        });
        return response.data.alumno;
    });

    if (status === "loading") {
        return (
            <Grid sx={{ width: "35%", margin: "0px auto", marginTop: "15px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                Cargando datos.........
                <CircularProgress />
            </Grid>
        );
    }

    if (status === "success") {
        return (
            <Grid sx={{ width: "100%" }}>
                <TableContainer component={Paper} sx={{ maxWidth: '90%', margin: "0px auto", marginTop: "15px", boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)' }}>
                    <Table>
                        <TableHead sx={{ width: "100%", textAlign: "center", backgroundColor:"#326fa6" }}>
                            <TableRow>
                                <TableCell colSpan={2}>
                                    <Typography variant="subtitle1" sx={{ textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", color: "white", transition: "all 1000ms"}}>
                                        Datos Personales <Person style={{ marginLeft: "5px" }} />
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <strong>Primer Nombre:</strong> {data.primer_nombre}
                                </TableCell>
                                <TableCell>
                                    <strong>Segundo Nombre:</strong> {data.segundo_nombre}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <strong>Apellido Paterno:</strong> {data.apellido_paterno}
                                </TableCell>
                                <TableCell>
                                    <strong>Apellido Materno:</strong> {data.apellido_materno}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <strong>Correo Institucional:</strong> {data.correo_institucional}
                                </TableCell>
                                <TableCell>
                                    <strong>Correo Personal:</strong> {data.correo_personal}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <strong>Dirección Académica:</strong> {data.direccion_academica}
                                </TableCell>
                                <TableCell>
                                    <strong>Dirección Particular:</strong> {data.direccion_particular}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <strong>Teléfono Personal:</strong> {data.telefono_personal}
                                </TableCell>
                                <TableCell>
                                    <strong>Teléfono Familiar:</strong> {data.telefono_familiar}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <strong>Carrera:</strong> {data.carrera.nombre_carrera}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        );
    }

    return null;
};

export default DataAlumno;