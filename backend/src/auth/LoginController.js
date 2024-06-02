
const jwt = require("jsonwebtoken");
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();


const Login = async(req,res) =>{
    try{
   
        const {rut,contrasena} = req.body;
        const user = await prisma.usuario.findFirst({
            where:{
                rut,contrasena
            },
            include:{tipo_usuario:true}
        })
        if(!user){
            return res.status(401).json({
                mensaje:"Credenciales inválidas"
            })
        }
        const token = jwt.sign({
            rut:rut,
            contrasena:contrasena
        },process.env.JWT_SECRETO,{
            expiresIn:process.env.JWT_TIEMPO_EXPIRA
        })
        if(!token){
            return res.status(401).json({
                mensaje:"Credenciales inválidas"
            })
        }
   
        if(Number(user.tipo_usuario.id_tipo_usuario)==1){
            const alumno = await prisma.alumno.findFirst({
                where:{
                    rut
                }
            })
            if(!alumno){
                return res.status(401).json({
                    mensaje:"No existe el alumno"
                })
            }
            const inscribe = await prisma.inscribe.findFirst({
                where:{
                    id_alumno:Number(alumno.id_alumno)
                },
                include:{
                    seccion:true
                }
            })

            if(!inscribe){
                return res.status(401).json({
                    mensaje:"No tienes inscrita la práctica en intranet"
                })
            }
            
            const asignatura = await prisma.asignatura.findFirst({
                where:{
                    id_asignatura:Number(inscribe.seccion.id_asignatura)
                }
            })
            if(!asignatura){
                return res.status(401).json({
                    mensaje:"No existe la asignatura"
                })
            }
            const inscripcion_practica = await prisma.inscripcion_practica.findFirst({
                where:{
                    id_inscribe:Number(inscribe.id_inscripcion)
                }
            })
         
            if(!inscripcion_practica){
                return res.status(200).json({
                    mensaje:"Se ha logueado correctamente",
                    token:token,
                    rol: user.tipo_usuario.id_tipo_usuario,
                    alumno:alumno,
                    id_inscribe:inscribe.id_inscripcion,
                    asignatura:asignatura.nombre_asignatura,
                    id_usuario: user.id_usuario
                })
            }else{
                return res.status(200).json({
                    mensaje:"Se ha logueado correctamente",
                    token:token,
                    rol: user.tipo_usuario.id_tipo_usuario,
                    alumno:alumno,
                    id_inscribe:inscribe.id_inscripcion,
                    asignatura:asignatura.nombre_asignatura,
                    id_inscripcion_practica:inscripcion_practica.id_inscripcion_practica,
                    id_usuario: user.id_usuario
                })
            }

            
        }
       
        return res.status(200).json({
            mensaje:"Se ha logueado correctamente",
            token:token,
            rol: user.tipo_usuario.id_tipo_usuario,
            id_usuario: user.id_usuario,
        })

    }catch(error){
        console.log(console.log(error.stack))
        return res.status(400).json({
            mensaje:"Error al loguearse"
        })
    }
}
module.exports = {Login};