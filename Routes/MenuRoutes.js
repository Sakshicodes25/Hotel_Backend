const express = require("express")
const router = express.Router();
const menuController = require("./../Controllers/MenuControllers")

router.post("/register",menuController.menuRegister );


router.get("/allMenu",menuController.menuGET);

router.get("/:taste",menuController.menuTaste);

router.put("/update/:id" ,menuController.menuUpdate );


router.delete("/delete/:id",menuController.menuDelete);


module.exports = router;