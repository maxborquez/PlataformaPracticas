import { useForm } from "react-hook-form";
import { Grid, Button, TextField, Typography, Alert, Card } from "@mui/material";
import { useRef, useState } from "react";
import { Business } from "@mui/icons-material";
import { useQuery, useQueryClient } from "react-query";
import Swal from "sweetalert2";
import clienteAxios from "../../../../helpers/clienteaxios";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from 'react-router-dom';

const FormularioEmpresa = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [comuna, setComuna] = useState("");
    const queryClient = useQueryClient();
    const formRef = useRef(null);
    const navigate = useNavigate();

    const handleComuna = (event) => {
        setComuna(event.target.value);
    };

    const handleBack = () => {
        navigate('/centros_practicas');
    };

    const onSubmit = async (data) => {
        Swal.fire({
            title: '¿Estás seguro de los datos?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí',
            cancelButtonText: "Cancelar",
            customClass: {
                container: "sweetalert_container"
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const data_oficial = {
                    rut_empresa: data.rut_empresa,
                    razon_social: data.razon_social,
                    direccion: data.direccion,
                    correo: data.correo,
                    telefono: data.telefono,
                    id_comuna: comuna.id_comuna,
                    id_estado_empresa: 1
                };
                console.log(data_oficial);
                const response = await clienteAxios.post("/empresa/create", data_oficial);

                if (response.status === 200) {
                    Swal.fire({
                        title: "Registrado",
                        text: "La empresa ha sido registrada correctamente",
                        icon: "success",
                        confirmButtonText: "Aceptar",
                        customClass: {
                            container: "sweetalert_container"
                        }
                    });
                    setTimeout(() => {
                        queryClient.refetchQueries("empresas");
                        formRef.current.reset();
                        Swal.close();
                    }, 2000);
                }
            }
        });
    }

    const getcomunas = useQuery("comunas", async () => {
        const response = await clienteAxios.get("/comuna/getComunas");
        return response.data.comuna;
    });

    return (
        <Grid container justifyContent="center" sx={{ width: "100%" }}>
            <Card sx={{ padding: "20px", width: "100%", margin:"16px", backgroundColor: "white" }}>
                <Typography
                    variant="h5"
                    sx={{
                        textAlign: "center",
                        marginTop: "10px",
                        marginBottom: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    Registro de empresa <Business style={{ marginLeft: "5px" }} />
                </Typography>
                <form method="POST" ref={formRef} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2} sx={{ marginTop: "10px" }}>
                        <Grid item xs={12} md={6}>
                            <TextField label="Rut empresa" fullWidth
                                {...register("rut_empresa", { required: true })}
                            />
                            {errors.rut_empresa && <Alert sx={{ marginTop: "5px" }} severity="error">Este campo es requerido</Alert>}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField label="Razón social"
                                {...register("razon_social", { required: true })}
                                fullWidth />
                            {errors.razon_social && <Alert sx={{ marginTop: "5px" }} severity="error">Este campo es requerido</Alert>}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField label="Dirección"
                                {...register("direccion", { required: true })}
                                fullWidth />
                            {errors.direccion && <Alert sx={{ marginTop: "5px" }} severity="error">Este campo es requerido</Alert>}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField label="Correo" fullWidth type="email"
                                {...register("correo", { required: true })}
                            />
                            {errors.correo && <Alert sx={{ marginTop: "5px" }} severity="error">Este campo es requerido</Alert>}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField label="Teléfono" fullWidth
                                type="number"
                                placeholder="9xxxxxxxx"
                                {...register("telefono", { required: true })}
                            />
                            {errors.telefono && <Alert sx={{ marginTop: "5px" }} severity="error">Este campo es requerido</Alert>}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Autocomplete
                                options={getcomunas.data || []}
                                getOptionLabel={(option) => option.nombre || ""}
                                value={comuna}
                                onChange={(event, newValue) => {
                                    setComuna(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} label="Comuna" fullWidth />}
                                noOptionsText="Sin coincidencias"
                                sx={{ backgroundColor: 'white' }}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Button variant="contained" type="submit" sx={{ width: "200px", margin: "0px auto" }}>
                                Registrar Empresa
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Card>
        </Grid>
    );
}

export default FormularioEmpresa;
