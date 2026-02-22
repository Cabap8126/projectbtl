const express = require("express")
const controller = require("../../controller/sv/pagehome")
const router = express();
router.get("/pagehome",controller.index)
router.get("/detail",controller.detail)
router.get("/listclass",controller.classlist);
router.get("/diem/:idclass",controller.diem)
router.get("/file/:idclass",controller.file)
router.get("/notification/:idclass",controller.notification)
router.get("/notificationDetail/:idclass/:idtbao",controller.notificationDetail)
module.exports = router