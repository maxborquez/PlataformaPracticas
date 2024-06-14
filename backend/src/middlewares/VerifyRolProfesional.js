const jwt = require("jsonwebtoken");

const AutenticacionProfesional = async(req,res, next)=>{
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];
    const rol = req.headers.rol;
    if(rol != 2){
        return res.status(401).json({
            mensaje:"No tienes autorización por tu rol"
        })
    }
    if(!token){
        return res.status(401).json({
            mensaje:"No estas autorizado"
        });
    }
     jwt.verify(token, process.env.JWT_SECRETO, (err, decodedToken) => {
        if (err) {
          // Si el token no es válido, devuelve un error 403
          return res.status(401).json({
              mensaje:"El token ha expirado"
          });
        }
    
        // Si el token es válido, agrega el objeto decodedToken al objeto req
        req.user = decodedToken;
     
        // Continúa con el siguiente middleware
        next();
      });

}

module.exports = {AutenticacionProfesional};