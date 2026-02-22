const express = require("express")
const router = express.Router()
const controller = require("../../controller/gv/auth")
const authvalidate = require("../../validates/gv/auth")
router.get("/login",controller.login)
router.post("/login",authvalidate.authValidates,controller.loginPost)
router.get("/logout",controller.logout)
router.get("/forgot",controller.forgot)
router.post("/forgot",controller.forgotPost);
router.get("/otp",controller.otp);
router.post("/otp",controller.otpPost)
router.get("/reset",controller.reset)
router.post("/reset",controller.resetPost);
module.exports = router