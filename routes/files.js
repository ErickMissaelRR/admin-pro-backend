/*
    path: './api/files/upload/:table/:id
*/

const { Router } = require("express");
const { fileUpload } = require("../controllers/files");
const { validateJWT } = require("../middlewares/validate-jwt");
const expressfileUpload = require('express-fileupload');

const router = Router();

// router.get("/:word", [
//     validateJWT
// ], getAll);

// default options
router.use(expressfileUpload());

router.put("/upload/:table/:id", [
    validateJWT
], fileUpload);

module.exports = router;