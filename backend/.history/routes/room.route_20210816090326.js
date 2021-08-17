const express = require("express");
const router = express.Router();
const roomController = require("../controllers/room.controller");

router.post("/create", roomController.create);
router.post("/add", roomController.add);
router.get("/get", roomController.getRoom);

module.exports = router;
