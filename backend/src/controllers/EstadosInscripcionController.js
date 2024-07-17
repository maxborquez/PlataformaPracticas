const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();

const mostrar_estados = async(req,res)=>{

    try{
        const estados = await prisma.estado_inscripcion.findMany();
        if(estados.length == 0){
            return res.status(200).json({
                mensaje:"No hay registros de estados"
            })
        }
        return res.status(200).json({
            mensaje:"Se han encontrado resultados",
            estados:estados
        })

    }catch(error){
        return res.status(400).json({
            mensaje:"Error al obtener estados"
        })
    }
}

module.exports = {mostrar_estados}