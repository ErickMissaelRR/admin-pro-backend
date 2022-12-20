const Users = require("../models/user");
const Hospital = require("../models/hospital");
const Medic = require("../models/medic");
const fs = require('fs')

const deleteImage = (path) => {
    if( fs.existsSync(path) ){
        //Borrar la imagen anterior
        fs.unlinkSync( path )
    }
}

const updateImage = async ( type, id, fileName ) => {
    let oldPath = '';
  switch (type) {
    case "medicos":
        const medic = await Medic.findById(id);
        if( !medic ){
            console.log('no es un medico');
            return false
        }

        oldPath = `./uploads/medicos/${ medic.img }`
        deleteImage(oldPath)

        medic.img = fileName;

        await medic.save();
        return true;

    case "hospitales":
        const hospital = await Hospital.findById(id);
        if( !hospital ){
            console.log('no es un hospital');
            return false
        }

        oldPath = `./uploads/hospitales/${ hospital.img }`
        deleteImage(oldPath)

        hospital.img = fileName;

        await hospital.save();
        return true;

    case "usuarios":
        const user = await Users.findById(id);
        if( !user ){
            console.log('no es un usuario');
            return false
        }

        oldPath = `./uploads/usuarios/${ user.img }`
        deleteImage(oldPath)

        user.img = fileName;

        await user.save();
        return true;

    default:
        return false;
  }
};

module.exports = {
  updateImage,
};
