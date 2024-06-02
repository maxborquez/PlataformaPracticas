const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();


const obtener_estados = async(req,res)=>{
    try{
        
        const estados = await prisma.estado_empresa.findMany();
        if(estados.length==0){
            return res.status(200).json({
                mensaje:"No hay registros"
            })
        }
        return res.status(200).json({
            mensaje:"Se han encontrado resultados",
            estados:estados
        })

    }catch(error){
        return res.status(400).json({
            mensaje:"Error al cargar el listado de estados"
        });
    }
}

module.exports={obtener_estados};