const mongoose = require("mongoose");
const  ChatSchema = new mongoose.Schema(
    {
        user_id : String,
        room_chat : String,
        content : String,
        images : Array,
        deleted : {
            type : Boolean,
            default : false
        },
        deletedAt :  Date,
    },{
        timestamps : true
    }
)
const Chat = mongoose.model("Chat",ChatSchema,"chats");
module.exports = Chat;