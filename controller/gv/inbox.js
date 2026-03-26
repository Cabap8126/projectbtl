const ClassPr = require("../../model/class.model")
const Svmodel = require("../../model/sv.model")
const Gvmodel = require("../../model/gv.model")
const Chats = require("../../model/chat")
module.exports.inbox = async (req,res)=>{
    const id = res.locals.user._id
    const dsclass = await ClassPr.find({
        magv : id
    })
    res.render("Gv/Page/inbox/listclass",{
        pagetitle : "Danh sách lớp học",
        dsclass : dsclass
    })
}
module.exports.dssv = async (req,res)=>{
    const id = req.params.idclass
    const dsclass = await ClassPr.findOne({
        _id : id
    })
    const dstsv = dsclass.dssv
    for(const sv of dstsv){
        const idSv = sv.masv;
        const tenSV = await Svmodel.findOne({
            _id : idSv
        })
        if(!tenSV){
            continue;
        }
        sv.tensv = tenSV.tensv            
    }
    res.render("Gv/Page/inbox/dssv",{
        pagetitle : "Danh sách lớp học",
        dssv: dsclass
    })
}
