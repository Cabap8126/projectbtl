const express = require("express");
const router = express.Router()
const controller = require("../../controller/index/index")
router.get("/",controller.index)
module.exports = router