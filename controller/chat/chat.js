const ClassPr = require("../../model/class.model")
const Svmodel = require("../../model/sv.model")
const Gvmodel = require("../../model/gv.model")
const Chats = require("../../model/chat")
const chatsocket = require("../../socket/inbox")
module.exports.inboxsv = async (req, res) => {
    const idroom = req.params.idroom
    // socket
    chatsocket(req, res)
    // end
    const chats = await Chats.find({
        room_chat: idroom,
        deleted: false
    })
    res.render("chats/chat", {
        pagetitle: "Chat",
        chats: chats,
        // user : userId
    })
}