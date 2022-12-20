const Users = require("../models/user");
const Hospital = require("../models/hospital");
const Medic = require("../models/medic");
const fs = require('fs')

const updateImage = async ( type, id, fileName ) => {
  switch (type) {
    case "medicos":
        const medic = await Medic.findById(id);
        if( !medic ){
            console.log('no es un medico');
            return false
        }

        const oldPath = `./uploads/medicos/${ medic.img }`

        if( fs.existsSync(oldPath) ){
            //Borrar la imagen anterior
            fs.unlinkSync( oldPath )
        }

        medic.img = fileName;

        await medic.save();
        return true;

    case "hospitales":
      break;

    case "usuarios":
      break;

    default:
      break;
  }
};

module.exports = {
  updateImage,
};
