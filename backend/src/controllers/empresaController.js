
const {PrismaClient} = require("@prisma/client")
const { validationResult } = require("express-validator")

const prisma = new PrismaClient()

const crear_empresa = async(req,res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                mensaje:"Se han encontrado errores",
                errors:errors.array()
            })
        }
        const {rut_empresa,razon_social,direccion,correo,telefono,id_comuna, id_estado_empresa} = req.body;

        const empresa = await prisma.empresa.create({
            data:{rut_empresa,razon_social,direccion,correo,telefono,id_comuna,id_estado_empresa}
        })
        if(!empresa){
            return res.status(400).json({
                mensaje:"Error al registrar empresa"
            })
        }

        return res.status(200).json({
            mensaje:"Empresa creada correctamente",
            empresa:empresa
        })

    }catch(error){
        return res.status(400).json({
            empresa:"Error al registrar empresa",
            error:error
        })
    }
}
const obtener_empresas = async(req,res)=>{
    try{
        const empresas = await prisma.empresa.findMany(
            {
                include:{comuna:true, estado_empresa:true}
            }
        );
        if(empresas.length==0){
            return res.status(200).json({
                mensaje:"no existen registros"
            })
        }
        let empresas_reverse = empresas.reverse()
        return res.status(200).json({
            mensaje:"Se han encontrado resultados",
            empresas:empresas_reverse
        })

    }catch(error){
        return res.status(400).json({
            empresa:"Error al obtener empresas",
            error:error
        })
    }
}
const eliminar_empresa = async (req,res) =>{
    try{
        const errors = validationResult(req);
  
        if(!errors.isEmpty()){
            return res.status(400).json({
                mensaje:"Se han encontrado errores",
                errors:errors.array()
            })
        }
        const {id} = req.params;
       
        const empresa = await prisma.empresa.findFirst({
            where:{
                id_empresa:Number(id)
            }
        })
        if(!empresa){
            return res.status(200).json({
                mensaje:"No se ha encontrado la empresa",   
            });
        }
        await prisma.empresa.delete({
            where:{
                id_empresa:Number(id)
            }
        })
        return res.status(200).json({
            mensaje:"Empresa ha sido eliminada correctamente"
        })

    }catch(error){
        return res.status(400).json({
            empresa:"Error al eliminar empresa",
            error:error
        })
    }
}

const mostrar_empresa = async(req,res) =>{
    try{
        const errors = validationResult(req);
     
        if(!errors.isEmpty()){
            return res.status(400).json({
                mensaje:"Se han encontrado errores",
                errors:errors.array()
            })
        }
        const {id} = req.params;
        const empresa = await prisma.empresa.findFirst({
            where:{
                id_empresa:Number(id),
            },include:{comuna:true}
        })
       
        if(!empresa){
            return res.status(200).json({
                mensaje:"No se ha encontrado la empresa",   
            });
        }
        return res.status(200).json({
            mensaje:"Se ha encontrado la empresa",
            empresa:empresa
        })

    }catch(error){
        return res.status(400).json({
            empresa:"Error al mostrar empresa",
            error:error
        })
    }
};
const actualizar_empresa = async(req,res) =>{
    try{
        const errors = validationResult(req);
      
        if(!errors.isEmpty()){
            return res.status(400).json({
                mensaje:"Se han encontrado errores",
                errors:errors.array()
            })
        }
        const {id} = req.params;
        const {rut_empresa,razon_social,direccion,correo,telefono,id_comuna, id_estado_empresa} = req.body;
        
        const empresa = await prisma.empresa.update({
            where:{
                id_empresa:Number(id)
            },
            data:{rut_empresa,razon_social,direccion,correo,telefono,id_comuna,id_estado_empresa}
        })
        if(!empresa){
            return res.status(400).json({
                mensaje:"Error al actualizar empresa"
            })
        }

        return res.status(200).json({
            mensaje:"Empresa actualizada correctamente",
            empresa:empresa
        })

    }catch(error){
        return res.status(400).json({
            empresa:"Error al actualizar empresa",
            error:error
        })
    }
};


module.exports = {crear_empresa,obtener_empresas,eliminar_empresa,mostrar_empresa,actualizar_empresa}