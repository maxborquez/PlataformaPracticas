import { Grid } from "@mui/material";
import Header from "../../../../components/headers/header";
import MostarAptitudes from "./components/mostrar_aptitudes";
import { useParams } from "react-router-dom";



const AptitudesAlumno = () =>{
    const {id} = useParams();
    return (
        <Grid sx={{width:"100%",display:"flex",flexDirection:"column"}}>
            <Header/>
            <MostarAptitudes id_alumno={id}/>
        </Grid>
    )
}


export default AptitudesAlumno;