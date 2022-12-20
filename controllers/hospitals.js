const { response } = require("express")
const Hospital = require('../models/hospital')

const getHospitals = async (req, res = response) => {

    const hospitals = await Hospital.find().populate('user', 'name img')

    res.json({
        ok: true,
        hospitals,
    })
}

const createHospital = async (req, res = response) => {

    const uid = req.uid;

    const hospital = new Hospital({
        user: uid,
        ...req.body
    });

    

    try {

        const hospitalDB = await hospital.save();
    
        res.json({
            ok: true,
            hospital: hospitalDB
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado, favor de ccomunicarse con el administrador"
          })
    }
}

const updateHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'putHospitals'
    })
}

const deleteHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'deleteHospitals'
    })
}

module.exports = {
    getHospitals, createHospital, updateHospital, deleteHospital
}