

const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();


const obtener_ciudades = async(req,res)=>{
    try{
        const ciudad = await prisma.ciudad.findMany({
        });

        if(ciudad.length ==0){
            return res.status(200).json({
                mensaje:"NO hay registro de ciudades"
            })
        }
        return res.status(200).json({
            mensaje:"Se han encontrado datos",
            ciudad:ciudad
        })
    }catch(error){
        return res.status(400).json({
            mensaje:"Error al cargar el listado de ciudades"
        });
    }
}

module.exports={obtener_ciudades};