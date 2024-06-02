
const {PrismaClient} = require('@prisma/client')
const {validationResult } = require('express-validator')

const prisma = new PrismaClient()


const obtener_aptitudes = async(req, res)=>{
    try {
        const aptitudes = await prisma.aptitud.findMany({
            orderBy:{
                nombre_aptitud:"asc"
            }
        })
        if(aptitudes.length === 0){
            return res.status(200).json({message:'Error, no existe lista de aptitudes'})
        }
        return res.status(200).json({
            message:'Se han encontrado con éxito las aptitudes',
            aptitudes:aptitudes
        })
        
    } catch (error) {
        return res.status(400).json({message:'Error, no se ha encontrado'})
    }
}

module.exports = {obtener_aptitudes}

