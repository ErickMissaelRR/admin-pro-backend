const { response } = require("express");
const Users = require("../models/user");
const Hospital = require("../models/hospital");
const Medic = require("../models/medic");

const getAll = async (req, res = response) => {
  const word = req.params.word;

  const regex = new RegExp(word, "i");

  try {

    const [users, hospitals, medics] = await Promise.all([
        Users.find({ name: regex }),
        Hospital.find({ name: regex }).populate("user", "name img"),
        Medic.find({ name: regex })
          .populate("user", "name img")
          .populate("hospital", "name img"),
      ]);

    res.status(200).json({
      ok: true,
      users,
      hospitals,
      medics,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error inesperado, favor de ccomunicarse con el administrador",
    });
  }

};

const getAllByCollection = async (req, res = response) => {
  const word = req.params.word;
  const table = req.params.table;
  const regex = new RegExp(word, "i");

  let data = [];

  switch (table) {
    case "medicos":
        data = await Medic.find({ name: regex }).populate("user", "name img")
        .populate("hospital", "name img");
      break;
    case "hospitales":
        data = await Hospital.find({ name: regex }).populate("user", "name img");
      break;
    case "usuarios":
        data = await Users.find({ name: regex })
      break;

    default:
        return res.status(400).json({
            ok: false,
            msg: 'La tabla tiene que se ser usuarios, hospitales o medicos'
        })

    }
    res.status(200).json({
      ok: true,
      data
    })
};

module.exports = {
  getAll, getAllByCollection
};
