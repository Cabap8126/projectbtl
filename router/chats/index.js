const inbox = require("./inbox")
const requireAuth = require("../../middleware/chats/index") 
module.exports = (app)=>{
    app.use("/inbox",requireAuth.requireAuth,inbox)
}