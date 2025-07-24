const express = require("express");
const router = express.Router();
const personController = require("../Controllers/PersonConrollers")


router.post("/register",personController.personRegister);

router.get("/workers",personController.personWorkers);

router.get("/:work", personController.personWork);

router.get("/:id",personController.personId);

router.put("/update/:id", personController.personUpdate);

router.delete("/delete/:id",personController.personDelete);

module.exports = router;
