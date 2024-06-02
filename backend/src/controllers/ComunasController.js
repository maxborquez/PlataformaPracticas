

const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();

const obtener_regiones = async(req,res)=>{
    try{
        const regiones = await prisma.region.findMany();

        if(regiones.length ==0){
            return res.status(200).json({
                mensaje:"NO hay registro de regiones"
            })
        }
        return res.status(200).json({
            mensaje:"Se han encontrado datos",
            regiones:regiones
        })
    }catch(error){
        return res.status(400).json({
            mensaje:"Error al cargar el listado de regiones"
        });
    }
}
const obtener_comunas = async(req,res)=>{
    try{
        const comuna = await prisma.comuna.findMany({
            
            
        });

        if(comuna.length ==0){
            return res.status(200).json({
                mensaje:"NO hay registro de comunas"
            })
        }
        return res.status(200).json({
            mensaje:"Se han encontrado datos",
            comuna:comuna
        })
    }catch(error){
        return res.status(400).json({
            mensaje:"Error al cargar el listado de comunas"
        });
    }
}

const obtener_comunas_por_region = async(req,res)=>{
    
    try{
        const {id_region} = req.body;
        const comunas = await prisma.comuna.findMany({
            where:{
                id_region: Number(id_region)
            }
        })
        if(comunas.length == 0){
            return res.status(200).json({
                mensaje:"No existe ninguna comuna asociada a esa región"
            })
        }
        return res.status(200).json({
            mensaje:"Se han encontrado comunas",
            comunas:comunas
        })

    }catch(error){
        return res.status(400).json({
            mensaje:"Error al cargar el listado de comunas"
        });  
    }
}

const obtener_region_por_comuna = async(req, res)=>{

    try{
        const {id_comuna} = req.body;
        const region = await prisma.comuna.findFirst({
            where:{
                id_comuna:Number(id_comuna)
            },
            include:{region:true}
        })
        if(!region){
            return res.status(400).json({
                mensaje:"No se ha encontrado la región"
            })
        }
        return res.status(200).json({
            mensaje:"Se han encontrado resultados",
            region: region.region
        })
    }catch(error){
        
        return res.status(400).json({
            mensaje:"Error al cargar la información",
            error:error.stack
        }); 
       
    }
}

module.exports={obtener_comunas,obtener_comunas_por_region,obtener_regiones,obtener_region_por_comuna};