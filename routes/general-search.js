/*
    path: './api/search/:word
*/

const { Router } = require("express");
const { getAll, getAllByCollection } = require("../controllers/search");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.get("/:word", [
    validateJWT
], getAll);

router.get("/collection/:table/:word", [
    validateJWT
], getAllByCollection);

module.exports = router;