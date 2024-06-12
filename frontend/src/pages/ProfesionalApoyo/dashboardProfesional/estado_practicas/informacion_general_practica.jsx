import { Grid } from "@mui/material";
import Header from "../../../../components/headers/header";
import DetalleInscripcion from "./components/detalleInscripcion";
import { useParams } from "react-router-dom";






const InformacionGeneral = ()=>{
    const {inscribe} = useParams();
    return (
        <Grid sx={{width:"100%",display:"flex",flexDirection:"column"}}>
            <Header/>
            <DetalleInscripcion id = {inscribe} />
        </Grid>
    )
}

export default InformacionGeneral;