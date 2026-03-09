const express = require("express")
const router = express.Router()
const controller = require("../../controller/chat/chat")
router.get("/:idroom",controller.inboxsv);
module.exports = router 