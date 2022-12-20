/*
    Ruta: '/api/medics'
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const {
  getMedics,
  createMedic,
  updateMedic,
  deleteMedic,
} = require("../controllers/medics");

const router = Router();

router.get("/", getMedics);

router.post(
  "/",
  [
    validateJWT,
    check("name", "El nombre del médico es requerido").not().isEmpty(),
    check("hospital", "El id del hospital debe de ser valido").isMongoId(),
    validateFields,
  ],
  createMedic
);

router.put("/:id", [validateJWT], updateMedic);

router.delete("/:id", validateJWT, deleteMedic);

module.exports = router;
