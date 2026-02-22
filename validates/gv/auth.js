module.exports.authValidates = async (req,res,next)=>{
    if(!req.body.email){
        req.flash("error","vui lòng nhập email")
        res.redirect("/auth/gv/login")
        return;
    }
    if(!req.body.password){
        req.flash("error","vui lòng nhập mật khẩu")
        res.redirect("/auth/gv/login")
        return
    }
    next();
}