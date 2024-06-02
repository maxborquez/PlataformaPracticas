const {PrismaClient} = require ('@prisma/client')

const {validationResult} = require('express-validator')
const prisma = new PrismaClient()


const crear_conocimiento = async (req, res)=>{
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                message: 'Se han encontrado errores',
                errors: errors.array()
            })
        }
        const {id_alumno, id_aptitud} = req.body
        const conocimientoAlumno = await prisma.conocimiento.create({
            data:{
                id_alumno: id_alumno,
                id_aptitud: id_aptitud
            }
        })
        if(!conocimientoAlumno){
            return res.status(400).json({message:'No se ha podido crear'})
        }
        return res.status(200).json({message:'Se ha creado correctamente'})
    } catch (error) {
        return res.status(400).json({message:'Error, no se ha podido crear',
        error:error.stack})

    }
}

const obtener_conocimientos = async(req, res)=>{
    try {
        const aptitudes = await prisma.conocimiento.findMany()
        if(aptitudes == 0){
            return res.status(200).json({message:'Error, no existe lista de aptitudes'})
        }
        return res.status(200).json({message:'Se han encontrado con éxito las aptitudes del alumno',
    aptitudes:aptitudes})
    } catch (error) {
        return res.status(400).json({message:'Error, no se ha encontrado',
    error:error.stack})
    }
}


const obtener_conocimiento = async(req, res)=>{
    const {id} = req.params
    try {
        const aptitudes = await prisma.conocimiento.findFirst({
            where:{
                id_conocimiento: Number(id)
            }
        })
        if(!aptitudes){
            return res.status(200).json({message:'Error, no existe'})
        }
        return res.status(200).json({
            message:'Se ha encontrado con éxito la aptitud/es',
            aptitudes:aptitudes
        })

    } catch (error) {
        return res.status(400).json({message:'Error, no se ha encontrado',error:error.stack }
        )
    }
}

const eliminar_conocimiento = async(req, res)=>{
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({message: 'Se ha encontrado un error', errors: errors.array()})
        }
        const {id} = req.params;
        const conocimientos = await prisma.conocimiento.findFirst({
            where:{
                id_conocimiento: Number(id)
            }
        })
        if(!conocimientos){
            return res.status(200).json({message: 'No se ha encontrado nada con este ID'})
        }
        await prisma.conocimiento.delete({
            where:{id_conocimiento:Number(id)}
        })
        return res.status(200).json({
            message:'Se ha eliminado con éxito',
        })
    } catch (error) {
        return res.status(400).json({message:'Error, no se ha podido eliminar',
        error: error.stack
    })
    }
}

const actualizar_conocimiento = async (req, res) =>{
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(200).json({message:'Existen errores', errors:errors.array()})
        }
        const {id} = req.params
        const {id_alumno, id_aptitud} = req.body
        const conocimientos = await prisma.conocimiento.findFirst({
            where:{
                id_conocimiento:Number(id)
            }
        })
        if(!conocimientos){
            return res.status(200).json({
                message:'No existe lista de conocimientos'
            })
        }
        const conocimientoNew = await prisma.conocimiento.update({
            where: {id_conocimiento:Number(id)},
            data:{
                id_alumno, id_aptitud
            }
        })
        if(!conocimientoNew){
            return res.status(200).json({message:'Error al actualizar los conocimientos'})
        }
        return res.status(200).json({
            message:'Se han actualizado con éxito los conocimientos',
            conocimiento:conocimientoNew
        })
    } catch (error) {
        return res.status(400).json({
            message:'Error, no se ha podido actualizar',
            error: error.stack
        })
    }
}

module.exports = {crear_conocimiento, obtener_conocimientos, obtener_conocimiento, eliminar_conocimiento, actualizar_conocimiento}