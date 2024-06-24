import { Grid } from "@mui/material";
import Header from "../../../components/headers/header";
import DetailsBitaAlumno from "../../Alumno/BitacoraAlumno/DetailsAlumno/DetailsBitaAlumno";




const DetalleBitacora = () =>{
    return (
        <Grid sx={{width:"100%",display:"flex",flexDirection:"column"}}>
            <Header/>
            <DetailsBitaAlumno/>
        </Grid>
    )
}

export default DetalleBitacora;