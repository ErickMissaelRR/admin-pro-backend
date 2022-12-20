/*
    path: './api/login
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn, refreshToken } = require("../controllers/auth");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.post("/", [
    check('email', 'El email es requerido').isEmail(),
    check('password', 'La contraseña es requerida').not().isEmpty(),
    validateFields
], login);

router.post("/google", [
    check('token', 'El token de google es requerido').not().isEmpty(),
    validateFields
], googleSignIn);

router.get("/refresh", [
    validateJWT
], refreshToken);

module.exports = router;
