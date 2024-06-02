

const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();

const obtenerRol = async(req,res) =>{
    try{
        const {rut,contrasena} = req.body;
        const rol = await prisma.usuario.findFirst({
            where:{
                rut:rut,
                    contrasena:contrasena
                
                 
            },
            include:{tipo_usuario:true}
        })
        if(!rol){
            return res.status(400).json({
                mensaje:"No existe el usuario"
            })
        }
      
        return res.status(200).json({
            mensaje:"Se ha encontrado el usuario",
            data:rol,
            rol:rol.tipo_usuario.nombre_tipo_usuario
        })

    }catch(error){
        
        return res.status(400).json({
            mensaje:"Error al obtener rol"
        })
    }
}

module.exports={obtenerRol};