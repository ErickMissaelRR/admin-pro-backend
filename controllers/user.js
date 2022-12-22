const { response } = require('express');
const User = require("../models/user");
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/JWT');
const user = require('../models/user');

const getUsers = async (req, res) => {

  const from = Number(req.query.from) || 0;
  const limit = Number(req.query.limit) || 20;
  
  // const users = await User.find({}, 'name email google role').skip(from).limit(limit);
  // const count = await User.count();

  const [ users, total ] = await Promise.all([
    User.find({}, 'name email google role img').skip(from).limit(limit),
    User.count(),
  ]);

  res.status(200).json({
    ok: true,
    users,
    total
  });
};

const createUser = async (req, res = response) => {

  const { email, password } = req.body;
  
  try {

    const userDB = await User.findOne({ email });

    if( userDB ){
      return res.status(400).json({
        ok: false,
        msg: 'El email ya fue registrado anteriormente'
      })
    }

    const user = new User( req.body );

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync(5);
    user.password = bcryptjs.hashSync( password, salt )
  
    await user.save();

    const token = await generateJWT( user.id )
  
    res.status(200).json({
      ok: true,
      user,
      token
    });
    
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error inesperado, favor de ccomunicarse con el administrador"
    })
  }
};

const updateUser = async (req, res = response) => {

  //TODO validar token 

  const uid = req.params.id

  try {

    const userExist = await User.findById(uid);

    if( !userExist ) {
      res.status(404).json({
        ok: false,
        msg: `El usuario con id: ${uid} no existe`
      })
    }

    const { password, email, ggogle, ...fields } = req.body;

    if( userExist.email !== email ){

      const invalidEmail = await User.findOne({ email });
      if( invalidEmail ){
        return res.status(400).json({
          ok: false,
          msg: 'Ya existe un usuario con ese email'
        })
      }

    }

    if(!userExist.google){
      //Actualizar data
      fields.email = email;
    }else if(userExist.email !== email){
      return res.status(400).json({
        ok: false,
        msg: 'Usuarios de google no pueden cambiar su correo'
      })
    }

    const userUpdated = await User.findByIdAndUpdate( uid, fields, { new: true } );

    res.json({
      ok: true,
      user: userUpdated
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado, favor de ccomunicarse con el administrador"
    })
  }
}

const deleteUser = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const userExist = await User.findById(uid);

    if( !userExist ) {
      res.status(404).json({
        ok: false,
        msg: `El usuario con id: ${uid} no existe`
      })
    }

    await User.findByIdAndDelete(uid);

    res.status(200).json({
      ok: true,
      msg: 'Usuario borrado correctamente'
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado, favor de ccomunicarse con el administrador"
    })
  }
}

module.exports = { getUsers, createUser, updateUser, deleteUser };
