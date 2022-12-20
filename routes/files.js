/*
    path: './api/files/upload/:table/:id
*/

const { Router } = require("express");
const { fileUpload, getImage } = require("../controllers/files");
const { validateJWT } = require("../middlewares/validate-jwt");
const expressfileUpload = require('express-fileupload');

const router = Router();

router.use(expressfileUpload());

router.put("/upload/:table/:id", [
    validateJWT
], fileUpload);

router.get("/upload/:table/:image", getImage);


module.exports = router;