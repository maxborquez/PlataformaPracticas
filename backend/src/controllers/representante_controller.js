
const {PrismaClient} = require('@prisma/client')
const {validationResult } = require('express-validator')

const prisma = new PrismaClient()

const crear_representante = async (req, res)=>{

    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json(
                {message: 'Se han encontrado errores', errors: errors.array()})
        }
        const {nombre, apellido, telefono, correo,cargo} = req.body
        const representante = await prisma.representante.create({
            data:{
                nombre: nombre, apellido:apellido, telefono:telefono, correo:correo,cargo:cargo
            }
        })
        if(!representante){
            return res.status(400).json({message:'No se ha podido crear el representante'})
        }
            return res.status(200).json({message:'El representante se ha añadido correctamente',representante:representante})
        } catch (error) {
           
            return res.status(400).json({message:'No se ha podido añadir el representante'})
        }
    }


    const obtener_representantes = async(req, res)=>{
        try {
            const representante = await prisma.representante.findMany()
            if(representante.length == 0){
                return res.status(200).json({message:'Error, no existe lista de representantes'})
            }
            return res.status(200).json({
                message:'Se han encontrado con éxito los representantes',
                representante:representante
            })

        } catch (error) {
            return res.status(400).json({message:'Error, no se ha encontrado'})
        }
    }


    const obtener_representante = async(req, res)=>{
        const {id} = req.params
        try {
            const representante = await prisma.representante.findFirst({
                where:{
                    id_representante:Number(id)
                }
            })
            if(!representante){
                return res.status(200).json({message:'Error, no existe este representante'})
            }
            return res.status(200).json({
                message:'Se ha encontrado con éxito el representante',
                representante:representante
            })

        } catch (error) {
            return res.status(400).json({message:'Error, no se ha encontrado'})
        }
    }


    const eliminar_representante = async(req, res)=>{
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json(
                    {message: 'Se han encontrado errores', errors: errors.array()})
            }
            const {id} = req.params;
            const representante = await prisma.representante.findFirst({
                where:{
                    id_representante: Number(id)
                }
            })
            if(!representante){
                return res.status(200).json({message: 'No se ha encontrado a ningun representante con este ID'})
            }
            await prisma.representante.delete({
                where: { id_representante: Number(id) }
            })
            return res.status(200).json({
                message:'Se ha eliminado con éxito el representante',
                // representanteEliminado:representanteEliminado
            })

        } catch (error) {
            return res.status(400).json({message:'Error, no se ha podido eliminar el representante',
            error:error.stack
        })
        }
    }


    const actualizar_representante = async(req, res)=>{
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({
                    message: 'Se han encontrado errores',
                    errors:errors.array()
                })
            }
            const {id} = req.params
            console.log(id)
            const { nombre, apellido, correo, telefono, cargo} = req.body;
            const representante = await prisma.representante.findFirst({
                where:{
                    id_representante: Number(id)
                }
            })
            console.log(representante);
            if(!representante){
                return res.status(200).json({
                    message:'No existe el representante'
                })
            }
            const representanteActualizado = await prisma.representante.update({
                where: { id_representante: Number(id) },
                data: {
                    nombre: nombre,
                    apellido:apellido,
                    telefono: telefono,
                    correo: correo,
                    cargo:cargo
                }
            })
          
            if(!representanteActualizado){
                return res.status(200).json({message:'Error al actualizar al representante'})
            }
            return res.status(200).json({
                message:'Se ha actualizado con éxito el representante',
                representante:representanteActualizado
            })

        } catch (error) {
            return res.status(400).json({
                message:'Error, no se ha podido actualizar el representante',
                error:error.stack
            })
        }
    }

    module.exports = {obtener_representante, obtener_representantes, crear_representante, eliminar_representante, actualizar_representante}
