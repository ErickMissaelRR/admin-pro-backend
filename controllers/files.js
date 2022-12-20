const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require("../helpers/updateImage");
const path = require('path');
const fs = require('fs');


const fileUpload = (req, res = response) => {
  const type = req.params.table;
  const id = req.params.id;

  const validTypes = ["hospitales", "medicos", "usuarios"];

  //Validar tipo
  if (!validTypes.includes(type)) {
    res.status(400).json({
      ok: false,
      msg: "Tipo de consulta no valido",
    });
  }

  //Validar que exista unn archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "No se encuentra ningún archivo",
    });
  }

  //Procesar imagen
  const file = req.files.image;
  const partialName = file.name.split('.');
  const fileExt = partialName[ partialName.length - 1 ];

  //Validar extensión
  const validExt = ['png', 'jpg', 'jpeg', 'gif'];
  if( !validExt.includes(fileExt) ){
    return res.status(400).json({
        ok: false,
        msg: "Tipo de archivo no valido",
      });
  }

  //Generar el archivo del nombre
  const fileName = `${ uuidv4() }.${ fileExt }`;

  //Path para guardar la imagen
  const path = `./uploads/${ type }/${ fileName }`; // ruta relativa
  //const path = (__dirname + `/uploads/${type}/${fileName}`); // ruta absoluta -- error

  //Mover la imagen
  file.mv(path, (err) => {
    if (err){
        console.log(err);
        return res.status(500).json({
            ok: false,
            msg: "Error inesperado, favor de ccomunicarse con el administrador"
        });
    }

    //Actualizar base de datos
    updateImage( type, id, fileName );

    res.status(200).json({
        ok: true,
        msg: 'Archivo subido con éxito',
        fileName,
      });
  });
};

const getImage = (req, res = response) => {

  console.log(req);
  const type = req.params.table;
  const image = req.params.image;

  console.log(type, image);

  const pathImage = path.join( __dirname, `../uploads/${ type }/${ image }` );

  //Imagen por defecto
  if( fs.existsSync( pathImage ) ){
    res.sendFile( pathImage );
  } else {
    const pathImage = path.join( __dirname, `../uploads/default/no-img.jpg` );
    res.sendFile( pathImage );
  }


  
} 

module.exports = {
  fileUpload, getImage
};
