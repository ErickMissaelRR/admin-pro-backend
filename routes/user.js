/*
    ruta: api/users
*/

const { Router } = require('express');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/user');
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get( '/' , validateJWT, getUsers);

router.post( '/' , [
    check('name', 'El usuario es requerido').not().isEmpty(),
    check('password', 'La contraseña es requerida').not().isEmpty(),
    check('email', 'El email es requerido').isEmail(),
    validateFields
], createUser);

router.put( '/:id' , [
    validateJWT,
    check('name', 'El usuario es requerido').not().isEmpty(),
    check('role', 'El rol es requerid0').not().isEmpty(),
    check('email', 'El email es requerido').isEmail(),
], updateUser);

router.delete('/:id', validateJWT, deleteUser)

module.exports = router