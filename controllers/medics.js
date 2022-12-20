const { response } = require("express");
const Medic = require('../models/medic')


const getMedics = async(req, res = response) => {

    const medics = await Medic.find().populate('user', 'name img').populate('hospital', 'name img')

    res.json({
        ok: true,
        medics
    })
}

const createMedic = async(req, res = response) => {

    const uid = req.uid;

    const medic = new Medic({
        user: uid,
        ...req.body
    })

    try {

        const medicDB = await medic.save();
        res.status(200).json({
            ok: true,
            medic: medicDB
          })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado, favor de ccomunicarse con el administrador"
          })
    }

    res.json({
        ok: true,
        msg: 'postMedics'
    })
}

const updateMedic = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'putMedics'
    })
}

const deleteMedic = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'deleteMedics'
    })
}

module.exports = {
    getMedics, createMedic, updateMedic, deleteMedic
}