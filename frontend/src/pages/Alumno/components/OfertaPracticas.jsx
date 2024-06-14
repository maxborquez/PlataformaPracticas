import { Alert, Grid, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Button, CircularProgress } from "@mui/material";
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
            throw new Error('Error fetching data');
        }
    });

    if (status === "loading") {
        return (
            <Grid sx={{ width: "35%", margin: "0px auto", marginTop: "20px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                Cargando datos.........
                <CircularProgress />
            </Grid>
        );
    }

    if (status === "error") {
        return (
            <Grid sx={{ width: "40%", margin: "0px auto", marginTop: "20px", display: "flex", flexDirection: "column" }}>
                <Alert severity="error">Error al cargar las ofertas: {error.message}</Alert>
            </Grid>
        );
    }

    if (status === "success" && data && data.ofertas && data.ofertas.length > 0) {
        return (
            <Grid sx={{ width: "90%", margin: "0px auto", display: "flex", flexDirection: "column" }}>
                <TableContainer component={Paper} sx={{ maxWidth: '90%', margin: "0px auto", marginTop: "10px", boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)' }}>
                    <Table>
                        <TableHead sx={{ width: "100%", textAlign: "center", backgroundColor: "#326fa6" }}>
                            <TableRow>
                                <TableCell colSpan={2}>
                                    <Typography variant="subtitle1" sx={{ textAlign: "center", color: "white", transition: "all 1000ms" }}>
                                        <strong>Listado Ofertas de Prácticas Profesionales</strong>
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                data.ofertas.map((oferta, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell>
                                            {oferta.descripcion}
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="contained" sx= {{ backgroundColor:"#326fa6" }} onClick={() => navigate(`/detalleoferta/${oferta.id_oferta_practica}`)}>Ver detalle</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        );
    }

    return (
        <Grid sx={{ width: "40%", margin: "0px auto", marginTop: "20px", display: "flex", flexDirection: "column" }}>
            <Alert severity="error">No hay ofertas publicadas</Alert>
        </Grid>
    );
};

export default OfertasPracticas;