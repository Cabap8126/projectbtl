const Gvmodel = require("../../model/gv.model")
const ClassPr = require("../../model/class.model")
const Svmodel = require("../../model/sv.model")
// chuyển views
module.exports.index = async ( req,res)=>{
    res.render("Gv/Page/PgH/pagehome",{
        pagetitle : "Trang của giảng viên"
    })
    
}
// end
// xem thông tin chi tiết
module.exports.detail = async (req,res)=>{
    res.render("Gv/Page/PgH/detail",{
        pagetitle : "Thông tin giảng viên"
    })
}//end
// hiện dsach class
module.exports.listclass = async (req,res)=>{
    const id = res.locals.gvien._id
    const dsclass = await ClassPr.find({
        magv : id
    })
    res.render("Gv/Page/listclass/listclass",{
        pagetitle : "Danh sách lớp học",
        dsclass : dsclass
    })
}//end
// hiện dssv
module.exports.dssv = async (req,res)=>{
    const id = req.params.id
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
    res.render("Gv/Page/listclass/dssv",{
        pagetitle : "Danh sách lớp học",
        dssv: dsclass
    })
}
// end
// chỉnh sửa 
module.exports.edit = async ( req,res)=>{
    const idsv = req.params.id;
    const idclass = req.params.idclass
    const ttsv = await Svmodel.findOne({
        _id : idsv
    })
    const diem = await ClassPr.findOne({
        _id : idclass,
        "dssv.masv" : idsv
    })
    for(const edit of diem.dssv){
        if(edit.masv == idsv){
            ttsv.cc1 = edit.cc1;
            ttsv.cc2 = edit.cc2;
            ttsv.th1 = edit.th1;
            ttsv.th2 = edit.th2
        }
    }
    res.render("Gv/Page/listclass/edit",{
        ttsv : ttsv,
        pagetile : "chỉnh sửa điểm",
        diem : diem
    })
}
// end
//nhận data từ form
module.exports.editPost = async (req,res)=>{
    const idsv = req.params.id;
    const idclass = req.params.idclass;
    const editdiem = req.body
    const lophc = await ClassPr.findOne({
        _id : idclass
    })
    await ClassPr.updateOne(
        {_id : idclass,"dssv.masv" : idsv},{
            $set :{
                "dssv.$.cc1": editdiem.cc1,
                "dssv.$.cc2": editdiem.cc2,
                "dssv.$.th1": editdiem.th1,
                "dssv.$.th2": editdiem.th2,
            }
        }
    )
    res.redirect(`/gv/dssv/${lophc._id}`)
}
// end
// hiển thị môn giảng
module.exports.mongiang = async (req,res)=>{
    const token = req.cookies.token;
    const monday = await Gvmodel.findOne({
        token : token
    })
    res.render("Gv/Page/mongiang/index",{
        monday : monday
    })
}//end
module.exports.deleted = async (req,res)=>{
    const idgv = req.params.idgv;
    const idmd = req.params.idmd
    await Gvmodel.updateOne(
        {_id : idgv},{$pull : {monday : {maMd : idmd}}}
    )
    res.redirect("/gv/mongiang")
}
module.exports.create = async (req,res)=>{
    const idgv = req.params.idgv;   
    res.render("Gv/Page/mongiang/create",{
        idgv : idgv
    })
}
module.exports.createpost = async (req,res)=>{
    const idgv = req.params.idgv
    const monday = req.body;
    await Gvmodel.updateOne(
        {_id : idgv},{$push : {monday : monday}}
    )
    res.redirect("/gv/mongiang")
}
// file
module.exports.file = async (req,res)=>{
    const idclass = req.params.idclass
    const clss = await ClassPr.findOne({
        _id : idclass
    })
    res.render("Gv/Page/file/index",{
        clss : clss
    }) 
}
module.exports.fileupdate = async ( req,res)=>{
    const idclass = req.params.idclass
    res.render("Gv/Page/file/create",{
        idclass : idclass
    })
}
module.exports.fileupdatePost = async (req,res)=>{
    const file = req.file
    const idclass = req.params.idclass
    await ClassPr.updateOne({_id : idclass},
        {$push : {dsfile : {tenfile : file.filename,path :`/uploads/${file.filename}`}}})
    res.redirect(`/gv/file/${idclass}`)
}
//end
// thông báo
module.exports.notification = async (req,res)=>{
    const idclass = req.params.idclass;
    const notification = await ClassPr.findOne({
        _id : idclass
    })
    const gvien = await Gvmodel.findOne({
        _id : notification.magv
    })
    res.render("Gv/Page/notification/index",{
        notification : notification,
        namegv : gvien.tenGv
    })
}
module.exports.notificationcreate = async (req,res)=>{
    const idclass = req.params.idclass;
    res.render("Gv/Page/notification/create",{
        idclass : idclass
    })
}
module.exports.notificationcreatePost = async (req,res)=>{
    const tbao = req.body
    const idclass = req.params.idclass;
    await ClassPr.updateOne({_id : idclass},{$push : {tbao : tbao}})
    res.redirect(`/gv/notification/${idclass}`)
}
module.exports.detailtbao = async (req,res)=>{
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
    res.render("Gv/Page/notification/detail",{
        objtb : objtb
    })
}
module.exports.editNoti = async (req,res)=>{
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
    res.render("Gv/Page/notification/edit",{
        idclass : idclass,
        idtbao : idtbao,
        objtb : objtb
    })
}
module.exports.editNotiPost = async (req,res)=>{
    const idclass = req.params.idclass;
    const idtbao = req.params.idtbao;
    const ttin = req.body
    await ClassPr.updateOne(
        {_id : idclass,"tbao._id":idtbao},
        {
            $set :{
                "tbao.$.title": ttin.title,
                "tbao.$.noidung" : ttin.noidung
            }
        }
    )
    res.redirect(`/gv/notification/${idclass}`);    
}
module.exports.deletedNoti = async (req,res)=>{
    const idclass = req.params.idclass;
    const idtbao = req.params.idtbao;
    await ClassPr.updateOne({_id : idclass},{$pull : {tbao : {_id : idtbao}}})
    res.redirect(`/gv/notification/${idclass}`);    
}
//end