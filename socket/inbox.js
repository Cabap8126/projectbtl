const Chat = require("../model/chat")
const Svmodel = require("../model/sv.model")
const Gvmodel = require("../model/gv.model")
module.exports = async (req,res)=>{
    let token = "";
    let userId = "";
    if(req.cookies.tokenSv){
        token = req.cookies.tokenSv
        const sv = await Svmodel.findOne({
            tokenSv : token
        })
        userId = sv._id
    }
    else{
        token = req.cookies.tokenGv
        const gv = await Gvmodel.findOne({
            tokenGv : token
        })
        userId = gv._id
    }
    const roomChat = req.params.idroom
    _io.once('connection', (socket) => {
        socket.join(roomChat);
        socket.on("CILENT_SEND_MESSAGE", async (data) => {
            // luu data
            const chat = new Chat({
                user_id: userId,
                room_chat : roomChat,
                content: data.content,
            });
            await chat.save();
            //trả data
            _io.to(roomChat).emit("SERVER_RETURN_MESSAGE", {
                userId: userId,
                fullName : "gv",
                content: data.content,
            })
        })
        //typing
        socket.on("CLIENT_SEND_TYPING", async (type) => {
            socket.broadcast.to(roomChat).emit("SERVER_RETURN_TYPING", {
                userId: userId,
                fullName: "gv",
                type: type
            })
        })
    });
}