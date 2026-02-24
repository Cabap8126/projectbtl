const Gvmodel = require("../../model/gv.model");
// kiểm tra thông tin cookies đăng nhập
module.exports.requireAuth = async (req , res , next)=>{
    if(!req.cookies.token){
        res.redirect("/auth/gv/login")
    }
    else{
        const token = req.cookies.token;
        const gvien = await Gvmodel.findOne({
            token: token,
            status: "active"
        }).select("-password")
        if(!gvien){
            res.redirect("/auth/gv/login")
        }
        else{
            res.locals.gvien = gvien
            next();
        }
    }
}
// end