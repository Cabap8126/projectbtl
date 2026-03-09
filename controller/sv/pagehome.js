const ClassPr = require("../../model/class.model")
const Gvmodel = require("../../model/gv.model")
// lấy thông tin và trả data cho giao diện
module.exports.index = async (req,res)=>{
    res.render("sv/Page/Pgh/pagehome",{
        pagetitle : "Trang của sinh viên"
    })
}
module.exports.detail = async (req,res)=>{
    res.render("sv/Page/Pgh/detail",{
        pagetitle : "Thông tin sinh viên"
    })  
}
module.exports.classlist = async (req,res)=>{
    const svien = res.locals.user
    const classlist = await ClassPr.find({
        "dssv.masv" : svien._id
    })
    res.render("sv/Page/listclass/index",{
        dsmon : classlist
    })

}
module.exports.diem = async ( req,res)=>{
    const idclass = req.params.idclass;
    const svien = res.locals.user
    const classlist = await ClassPr.findOne({
        _id : idclass,
        "dssv.masv" : svien._id
    })
    const ttsv = {}
    for(const item of classlist.dssv){
        if(item.masv == svien._id){
            ttsv.cc1 = item.cc1;
            ttsv.cc2 = item.cc2;
            ttsv.th1 = item.th1;
            ttsv.th2 = item.th2;
            ttsv.tenmh = classlist.nameCls;
            ttsv.mamh = classlist.mamh
            break;
        }
    }
    res.render("sv/Page/diem/index",{
        ttsv : ttsv
    })
}
module.exports.file = async (req,res)=>{
    const idclass = req.params.idclass;
    const file = await ClassPr.findOne({
        _id : idclass
    })
    res.render("sv/Page/file/index",{
        file : file.dsfile
    })
}
module.exports.notification = async (req,res)=>{
    const idclass = req.params.idclass;
    const notification = await ClassPr.findOne({
        _id : idclass
    });
    const gvien = await Gvmodel.findOne({
        _id : notification.magv
    })
    res.render("sv/Page/notification/index",{
        notification : notification,
        namegv : gvien.tenGv
    })
}
module.exports.notificationDetail = async (req,res)=>{
    const idclass = req.params.idclass;
    const idtbao = req.params.idtbao;
    const objtb = {}
    const ndung = await ClassPr.findOne({
        _id: idclass,
    })
    for(const item of ndung.tbao){
        if(item._id == idtbao){
            objtb.title = item.title;
            objtb.noidung = item.noidung;
            break;
        }
    }
    res.render("sv/Page/notification/detail",{
        objtb : objtb
    })
}
// end