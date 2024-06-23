
const {PrismaClient} = require("@prisma/client");
const { validationResult } = require("express-validator");

const prisma = new PrismaClient();

const crear_oferta = async(req,res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                mensaje:"Se han encontrado errores",
                errors:errors.array()
            })
        }
        const {descripcion,experiencia_laboral,cupos,id_modalidad,id_periodo_academico,id_empresa} = req.body;
        const oferta = await prisma.oferta_practica.create({
            data:{
                descripcion,experiencia_laboral,cupos,id_empresa,id_periodo_academico,id_modalidad
            }
        })
        if(!oferta){
            return res.status(400).json({
                mensaje:"error al crear una oferta"
            })
        }
        return res.status(200).json({
            mensaje:"Oferta de práctica creada correctamente",
            oferta:oferta
        })
        
    }catch(error){
      
        return res.status(400).json({
            mensaje:"Error al crear la oferta",
            error:error.stack
        })
    }
}

const mostrar_ofertas = async (req, res) => {
    try {
        const ofertas = await prisma.oferta_practica.findMany({
            include: {
                periodo_academico: true,
                modalidad: true,
                empresa: {
                    include: {
                        comuna: true
                    }
                }
            }
        });

        if (ofertas.length == 0) {
            return res.status(200).json({
                mensaje: "No hay ofertas registradas"
            });
        }

        let ofertas_reverse = ofertas.reverse();
        return res.status(200).json({
            mensaje: "Se han encontrado resultados",
            ofertas: ofertas_reverse
        });
    } catch (error) {
        return res.status(400).json({
            mensaje: "Error al crear la oferta",
            error: error.stack
        });
    }
};


const mostrar_oferta = async(req,res) =>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                mensaje:"Se han encontrado errores",
                errors:errors.array()
            })
        }

        const {id} = req.params;
        const oferta = await prisma.oferta_practica.findFirst({
            where:{
                id_oferta_practica:Number(id)
            },
            include:{modalidad:true,periodo_academico:true,empresa:true}
        })
        if(!oferta){
            return res.status(200).json({
                mensaje: "no existe esa oferta"
            })
        }
        
        return res.status(200).json({
            mensaje:"Se han encontrado registros",
            oferta:oferta
        })

    }catch(error){
        return res.status(400).json({
            mensaje:"Error al mostrar la oferta",
            error:error.stack
        })
    }
};

const eliminar_oferta = async(req,res) =>{
    try{
        const {id} = req.params;
        const oferta = await prisma.oferta_practica.findFirst({
            where:{
                id_oferta_practica:Number(id)
            }
        })
        if(!oferta){
            return res.status(200).json({
                mensaje:"No se ha encontrado la oferta"
            })
        }
        await prisma.oferta_practica.delete({
            where:{
                id_oferta_practica:Number(id)
            }
        })
        return res.status(200).json({
            mensaje:"Se ha eliminado correctamente"
        })
    }catch(error){
        return res.status(400).json({
            mensaje:"Error al eliminar la oferta",
            error:error.stack
        })
    }
}
const actualizar_oferta = async(req, res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                mensaje:"Se han encontrado errores",
                errors:errors.array()
            })
        }
        const {id} = req.params;
        const {descripcion,experiencia_laboral,cupos,id_modalidad,id_periodo_academico,id_empresa} = req.body;
        const oferta = await prisma.oferta_practica.findFirst({
            where:{
                id_oferta_practica:Number(id)
            }
        })
        if(!oferta){
            return res.status(200).json({
                mensaje:"No existe la oferta"
            })
        }
        const oferta_actualizada = await prisma.oferta_practica.update({
            where:{
                id_oferta_practica:Number(id)
            },
            data:{
                descripcion,experiencia_laboral,cupos,id_modalidad,id_periodo_academico,id_empresa
            }
        })
        if(!oferta_actualizada){
            return res.status(400).json({
                mensaje:"Error al actualizar la oferta",
            })
        }
        return res.status(200).json({
            mensaje:"Oferta actulizada correctamente",
            oferta:oferta_actualizada
        })

    }catch(error){
        return res.status(400).json({
            mensaje:"Error al actualizar la oferta",
            error:error.stack
        })
    }
};


module.exports={crear_oferta,mostrar_ofertas,mostrar_oferta,eliminar_oferta,actualizar_oferta}