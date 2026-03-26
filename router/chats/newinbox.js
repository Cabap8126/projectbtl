const express = require("express")
const router = express.Router()
const controller = require("../../controller/chat/newibx")
router.get("/:idclss/:idsv",controller.index);
module.exports = router 