const express = require("express")
const controller = require("../../controller/sv/dsgv")
const router = express();
router.get("/",controller.index)
module.exports = router