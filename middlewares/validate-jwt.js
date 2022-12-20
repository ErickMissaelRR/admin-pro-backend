const jwt = require("jsonwebtoken");


const validateJWT = ( req, res, next ) => {

    //Leer token
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.SEED_JWT)

        req.uid = uid

        next();
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'token invalido'
        })
    }
}

module.exports = {
    validateJWT
}