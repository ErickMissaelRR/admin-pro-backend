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

const updateHospital = async (req, res = response) => {

    const hospitalId = req.params.id
    const uid = req.uid;

    try {

        const hospitalDB = await Hospital.findById(hospitalId);

        if( !hospitalDB ){
            return res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado por id'
            })
        }

        const latestChanges = {
            ...req.body,
            user: uid
        }
        
        const updatedHospital = await Hospital.findByIdAndUpdate( hospitalId, latestChanges, { new: true } )

        res.status(200).json({
            ok: true,
            hospital: updatedHospital 
        })
        
    } catch (error) {
        console.log((error));
        res.status(500).json({
            ok: false,
            msg: "Error inesperado, favor de ccomunicarse con el administrador"
        })
    }

    
}

const deleteHospital = async (req, res = response) => {

    const hospitalId = req.params.id

    try {

        const hospitalDB = await Hospital.findById(hospitalId);

        if( !hospitalDB ){

            res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado por id'
            })   
        }

        await Hospital.findByIdAndDelete(hospitalId);

        res.json({
            ok: true,
            msg: 'Hospital eliminado'
        })
    } catch (error) {
        console.log((error));
        res.status(500).json({
            ok: false,
            msg: "Error inesperado, favor de ccomunicarse con el administrador"
        })
    }

    
}

module.exports = {
    getHospitals, createHospital, updateHospital, deleteHospital
}