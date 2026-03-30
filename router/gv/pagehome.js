const express = require("express")
const router = express.Router();
const multer = require("multer")
const storage = require("../../helpers/storage")
const upload = multer({storage : storage()})
const controller = require("../../controller/gv/pagehome")
router.get("/pagehome",controller.index)
router.get("/detail",controller.detail)
router.get("/listclass",controller.listclass);
router.get("/dssv/:id",controller.dssv);
router.post("/edit/:idclass/:id",controller.editPost)
router.get("/mongiang" , controller.mongiang);
router.get("/deleted/:idgv/:idmd",controller.deleted);
router.get("/create/:idgv",controller.create)
router.post("/create/:idgv",controller.createpost);
router.get("/file/:idclass",controller.file)
router.get("/fileupload/:idclass",controller.fileupdate)
router.post("/fileupload/:idclass",upload.single("file"),controller.fileupdatePost)
router.get("/notification/:idclass",controller.notification)
router.get("/notificationcreate/:idclass",controller.notificationcreate)
router.post("/notificationcreate/:idclass",controller.notificationcreatePost)
router.get("/notificationDetail/:idclass/:idtbao",controller.detailtbao)
router.get("/notificationEdit/:idclass/:idtbao",controller.editNoti)
router.post("/notificationEdit/:idclass/:idtbao",controller.editNotiPost)
router.get("/notificationDeleted/:idclass/:idtbao",controller.deletedNoti)
module.exports = router