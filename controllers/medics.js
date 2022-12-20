const { response } = require("express");
const Medic = require("../models/medic");

const getMedics = async (req, res = response) => {
  const medics = await Medic.find()
    .populate("user", "name img")
    .populate("hospital", "name img");

  res.json({
    ok: true,
    medics,
  });
};

const createMedic = async (req, res = response) => {
  const uid = req.uid;

  const medic = new Medic({
    user: uid,
    ...req.body,
  });

  try {
    const medicDB = await medic.save();
    res.status(200).json({
      ok: true,
      medic: medicDB,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error inesperado, favor de ccomunicarse con el administrador",
    });
  }
};

const updateMedic = async (req, res = response) => {
  const medicId = req.params.id;
  const uid = req.uid

  try {
    const medicDB = await Medic.findById(medicId);

    if (!medicDB) {
      return res.status(404).json({
        ok: true,
        msg: "Médico no encontado por id",
      });
    }

    const latestChanges = {
        ...req.body,
        user: uid
    }

    const updatedHospital = await Medic.findByIdAndUpdate( medicId, latestChanges, { new: true } )

    res.json({
      ok: true,
      medics: updatedHospital,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado, favor de ccomunicarse con el administrador",
    });
  }
};

const deleteMedic = async(req, res = response) => {
    const medicId = req.params.id

    try {

        const medicDB = await Medic.findById(medicId);

        if( !medicDB ){

            res.status(404).json({
                ok: true,
                msg: 'Médico no encontrado por id'
            })   
        }

        await Medic.findByIdAndDelete(medicId);

        res.json({
            ok: true,
            msg: 'Médico eliminado'
        })
    } catch (error) {
        console.log((error));
        res.status(500).json({
            ok: false,
            msg: "Error inesperado, favor de comunicarse con el administrador"
        })
    }
};

module.exports = {
  getMedics,
  createMedic,
  updateMedic,
  deleteMedic,
};
