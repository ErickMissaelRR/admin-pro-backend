const { response } = require("express");
const User = require("../models/user");
const  bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/JWT");


const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        //Validar email
        const userDB = await User.findOne({email});

        if( !userDB ){
            res.status(404).json({
                ok: false,
                msg: 'La contraseña y/o el email no existen'
            })
        }

        //validar contraseña
        const validPassword = bcryptjs.compareSync(password, userDB.password);

        if( !validPassword ){
            res.status(400).json({
                ok: true,
                msg: 'La contraseña y/o el email no existen'
            })
        }

        //Generar el token - JWT
        const token = await generateJWT( userDB.id );

        res.status(200).json({
            ok: true,
            token
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, favor de ccomunicarse con el administrador'
        })
    }
}

module.exports = {
    login
}