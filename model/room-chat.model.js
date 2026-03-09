const mongoose = require("mongoose")
const roomChatScheme = new mongoose.Schema(
    {
        title : String,
        avatar : String,
        typeRoom : String,
        status : String,
        users : [
            {
                user_id : String,
                role : String
            }
        ],
        deleted : {
            type : Boolean,
            default : false
        },
        deletedAt : Date,
    },{
        timestamps : true
    }
)
const RoomChat = mongoose.model("RoomChat",roomChatScheme,"rooms-chat");
module.exports = RoomChat