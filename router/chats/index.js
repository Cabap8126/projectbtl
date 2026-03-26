const inbox = require("./inbox")
const requireAuth = require("../../middleware/chats/index") 
const newinbox = require("./newinbox")
module.exports = (app)=>{
    app.use("/inbox",requireAuth.requireAuth,inbox)
    app.use("/newinbox",requireAuth.requireAuth,newinbox)
}