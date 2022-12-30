/*
    Ruta: '/api/hospitals'
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { getHospitals, updateHospital, createHospital, deleteHospital } = require('../controllers/hospitals');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT, validateRole } = require('../middlewares/validate-jwt');

const router = Router();

router.get( '/', [], getHospitals);

router.post( '/' , [
   validateJWT,
   validateRole,
   check('name', 'El nombre del hospital es requerido').not().isEmpty(),
   validateFields,
], createHospital);
    
router.put( '/:id' , [
    validateJWT,
    validateRole,
    check('name', 'El nombre del hospital es requerido').not().isEmpty(),
    validateFields,
], updateHospital);

router.delete('/:id',[validateJWT, validateRole], deleteHospital)

module.exports = router