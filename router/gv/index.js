const pagehome = require("./pagehome") 
const auth = require("./auth")
const requireAuth = require("../../middleware/gv/auth") // bảo mật đăng nhập
module.exports = (app)=>{
    app.use("/gv",requireAuth.requireAuth,pagehome)
    app.use("/auth/gv",auth)
    
}
