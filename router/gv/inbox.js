const express = require("express")
const router = express.Router()
const controller = require("../../controller/gv/inbox")
router.get("/",controller.inbox)
router.get("/:idclass",controller.dssv)
// router.get("/:idroom",controller.inboxsv);
module.exports = router 