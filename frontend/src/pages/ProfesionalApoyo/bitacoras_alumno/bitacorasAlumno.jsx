import { Grid } from "@mui/material";
import Header from "../../../components/headers/header";
import MostrarBitacoras from "./mostrar_bitacoras";



const BitacorasAlumno = () =>{

    return (
        <Grid sx={{width:"100%",display:"flex",flexDirection:"column"}}>
            <Header/>
            <MostrarBitacoras/>
        </Grid>
    )
}


export default BitacorasAlumno;