import { useQuery } from "react-query";
import { CircularProgress, Grid, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import { Person } from "@mui/icons-material";
import clienteAxios from "../../../../helpers/clienteaxios";

const DataAlumno = () => {
    const idAlumno = localStorage.getItem("id_alumno"); // Cambia esto si necesitas obtener el ID de otra manera

    const { data, status } = useQuery("datosAlumno", async () => {
        const response = await clienteAxios.get(`/sp/datosAlumno/${idAlumno}`);
        return response.data[0]; // Asumiendo que el endpoint devuelve un array y solo necesitas el primer elemento
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
                                    <strong>Nombre Completo:</strong>
                                </TableCell>
                                <TableCell>
                                    {data.nombre}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <strong>Correo Institucional:</strong>
                                </TableCell>
                                <TableCell>
                                    {data.alu_email}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <strong>Teléfono Personal:</strong>
                                </TableCell>
                                <TableCell>
                                    {data.alu_celular}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <strong>Teléfono Familiar:</strong>
                                </TableCell>
                                <TableCell>
                                    {data.alu_fono}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <strong>Dirección Particular:</strong>
                                </TableCell>
                                <TableCell>
                                    {data.dir_domicilio}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <strong>Ciudad:</strong>
                                </TableCell>
                                <TableCell>
                                    {data.ciudad}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <strong>Carrera:</strong>
                                </TableCell>
                                <TableCell>
                                    {data.crr_nombre}
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
