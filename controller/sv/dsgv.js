const ClassPr = require("../../model/class.model")
const Gvmodel = require("../../model/gv.model")
const RoomChat = require("../../model/room-chat.model")
module.exports.index = async (req,res)=>{
    const svien = res.locals.user
    const classlist = await ClassPr.find({
        "dssv.masv" : svien._id
    })  
    for(const item of classlist){
        const ttgv = await Gvmodel.findOne(
            {
                _id : item.magv
            }
        )
        item.user = ttgv.tenGv        
    }
    for (const item of classlist) {
        const idroom = await RoomChat.findOne({
            "users.user_id": { $all: [svien._id, item.magv] }
        })
        item.idroom = idroom._id
    }
    res.render("sv/Page/inbox/index",{
        dsgv : classlist
    })
}