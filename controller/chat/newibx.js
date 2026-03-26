const RoomChat = require("../../model/room-chat.model")
const ClassPr = require("../../model/class.model")
module.exports.index = async (req, res) => {
    const idsv = req.params.idsv
    const idgv = res.locals.user._id
    const idclss = req.params.idclss
    const new_room = new RoomChat(
        {
            typeRoom: "inbox",
            users: [
                {
                    user_id: idgv,
                    role: "spadm"
                },
                {
                    user_id: idsv,
                    role: "adm"
                }
            ]
        }
    )        
    await new_room.save();
    const classIB = await ClassPr.findOne({
        _id : idclss
    })
    for(const sv of classIB.dssv){
        if(sv.masv == idsv){
            sv.room_id = new_room.id.toString()
            break;
        }
    }
    await classIB.save();
    req.flash("success",`Đã tạo inbox với sinh viên ${idsv}`)
    res.redirect(`/dssv/${idclss}`)
}