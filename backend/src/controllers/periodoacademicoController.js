
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()


const mostrar_periodos_academicos = async(req,res)=>{
    try{
        const periodos = await prisma.periodo_academico.findMany();
        if(periodos.length==0){
            return res.status(200).json({
                mensaje:"No hay registros de periodos",
            })
        }
        return res.status(200).json({
            mensaje:"Se han obtenidos resultados",
            periodos:periodos
        })
    }catch(error){
        return res.status(400).json({
            mensaje:"Error al obtener periodos académicos"
        })
    }
}

module.exports={mostrar_periodos_academicos}