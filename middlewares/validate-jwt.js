const jwt = require("jsonwebtoken");
const user = require("../models/user");


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

const validateRole = async (req, res, next) => {

    const uid = req.uid

    try {

        const userDB = await user.findById(uid);

        if( !userDB ){
            return res.status(404).json({
                ok: false,
                msg: 'No se ha encontrado un usuario con ese id'
            })
        }

        if( userDB.role !== 'ADMIN_ROLE' ){
            return res.status(403).json({
                ok: false,
                msg: 'No cuenta con los permisos necesarios'
            })
        }

        next();
        
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, favor de ccomunicarse con el administrador'
        })
    }

}

const validateSameUser = async (req, res, next) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const userDB = await user.findById(uid);

        if( !userDB ){
            return res.status(404).json({
                ok: false,
                msg: 'No se ha encontrado un usuario con ese id'
            })
        }

        if( userDB.role === 'ADMIN_ROLE' || id === uid){
            next();
        } else {
            return res.status(403).json({
                ok: false,
                msg: 'No cuenta con los permisos necesarios'
            })
        }
        
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, favor de ccomunicarse con el administrador'
        })
    }

}

module.exports = {
    validateJWT,
    validateRole,
    validateSameUser
}