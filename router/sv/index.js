const auth = require("./auth")
const pagehome = require("./pagehomesv")
const requireAuth = require("../../middleware/sv/auth") // bảo mật đăng nhập
module.exports = (app)=>{
    app.use("/sv",requireAuth.requireAuth,pagehome)
    app.use("/auth/sv",auth)
}