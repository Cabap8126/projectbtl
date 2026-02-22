const auth = require("./auth")
const pagehome = require("./pagehomesv")
const requireAuth = require("../../middleware/sv/auth")
module.exports = (app)=>{
    app.use("/sv",requireAuth.requireAuth,pagehome)
    app.use("/auth/sv",auth)
}