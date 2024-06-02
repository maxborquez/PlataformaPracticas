
const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();

const obtener_alumno = async(req,res)=>{
    try{
        const {rut} = req.body;
        const alumno = await prisma.alumno.findFirst({
            where:{
                rut: rut
            },
            include:{
                carrera:true
            }
        })
        if(!alumno){
            return res.status(200).json({
                mensaje:"No existe el alumno"
            })
        }
        return res.status(200).json({
            mensaje:"se ha encontrado el alumno",
            alumno:alumno
        })
    }catch(error){
       
        return res.status(400).json({
            mensaje:"error al obtener el alumno"
        })
    }
}
/*
const obtener_apitudes_alumno =  async(req,res)=>{
    try{
        const {id_alumno} = req.body;
        const aptitudes = await prisma.conocimiento.findMany({
            
            where:{
                id_alumno:Number(id_alumno)
            },
            include:{aptitud:true}
            
        })
        if(aptitudes.length==0){
            return res.status(200).json({
                mensaje:"No tiene aptitudes asociadas"
            })
        }
        
        return res.status(200).json({
            mensaje:"Se han encontrado aptitudes",
            aptitudes:aptitudes
        })
    }catch(error){
        
        return res.status(400).json({
            mensaje:"error al encontrar aptitudes"
        })
    }
}
*/
const obtener_apitudes_alumno =  async(req,res)=>{
    try{
        const {id_alumno} = req.body;
        const aptitudes = await prisma.conocimiento.findMany({
            where:{
                id_alumno:Number(id_alumno)
            },
            include:{aptitud:true}
        });

        if(aptitudes.length==0){
            return res.status(200).json({
                mensaje:"No tiene aptitudes asociadas"
            });
        }

        // Ordenando las aptitudes alfabéticamente según el campo 'nombre' (o cualquier otro campo que quieras)
        aptitudes.sort((a, b) => {
            if ( a.aptitud.nombre_aptitud < b.aptitud.nombre_aptitud) return -1;
            if (a.aptitud.nombre_aptitud > b.aptitud.nombre_aptitud) return 1;
            return 0;
        });

        return res.status(200).json({
            mensaje:"Se han encontrado aptitudes",
            aptitudes:aptitudes
        });

    } catch(error) {
        return res.status(400).json({
            mensaje:"error al encontrar aptitudes"
        });
    }
};

module.exports={obtener_alumno,obtener_apitudes_alumno};