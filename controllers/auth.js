const { response } = require("express");
const User = require("../models/user");
const  bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/JWT");
const { googleVerify } = require("../helpers/google-verify");


const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        //Validar email
        const userDB = await User.findOne({email});
        const validPassword = bcryptjs.compareSync(password, userDB.password);

        if( !userDB || !validPassword){
            return res.status(404).json({
                ok: false,
                msg: 'La contraseña y/o el email no existen'
            })
        } else {
            
        }

        //validar contraseña
        

        // if( !validPassword ){
        //     res.status(400).json({
        //         ok: true,
        //         msg: 'La contraseña y/o el email no existen'
        //     })
        // }

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

const googleSignIn = async (req, res = response) => {

    try {
        
        const { email, name, picture } = await googleVerify(req.body.token)

        const userDB = await User.findOne({email})
        let user;

        if( !userDB) {
            user = new User({
                name,
                email,
                password: '@@@',
                img: picture,
                google: true
            })
        } else {
            user = userDB;
            user.google = true;
        }

        //Guardar usuario
        await user.save();

        //Generar JWT
        const token = await generateJWT( user.id );

        res.status(200).json({
            ok: true,
            data: {
                email, 
                name, 
                picture,
                token
            }
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok:true,
            msg: 'Token de google invalido'
        })
    }
}

const refreshToken = async(req, res = response) => {

    const { uid } = req;

    //Generar un nuevo token
    const token = await generateJWT( uid )

    //Obtener data del usuario
    try {

        const userDB = await User.findById(uid);
    
        const { name, email, role, img, google } = userDB

    res.status(200).json({
        ok: true,
        token,
        user: {
            uid,
            name,
            email,
            role,
            img,
            google
        }
    })

        if( !userDB ){
            res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            })
        }
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, favor de ccomunicarse con el administrador'
        })
    }
    
}

module.exports = {
    login, googleSignIn, refreshToken
}