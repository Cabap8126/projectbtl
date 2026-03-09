const Gvmodel = require("../../model/gv.model");
// kiểm tra thông tin cookies đăng nhập
module.exports.requireAuth = async (req , res , next)=>{
    if(!req.cookies.tokenGv){
        res.redirect("/auth/gv/login")
    }
    else{
        const tokenGv = req.cookies.tokenGv;
        const user = await Gvmodel.findOne({
            tokenGv: tokenGv,
            status: "active"
        }).select("-password")
        if(!user){
            res.redirect("/auth/gv/login")
        }
        else{
            res.locals.user = user
            next();
        }
    }
}
// end