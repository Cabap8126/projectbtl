const Gvmodel = require("../../model/gv.model");
const ForgotPsw = require("../../model/forgot.model")
const ramdom = require("../../helpers/ramdom")
const sendmail = require("../../helpers/sendmail")
// kiểm tra đăng nhập
module.exports.login = async (req,res)=>{
    if(req.cookies.token){
        res.redirect("/gv/pagehome")
    }
    else{
        res.render("Gv/Page/auth/login",{
            pagetitle : "Trang đăng nhập"
        })        
    }

}
// end
// lấy data từ form gửi
module.exports.loginPost = async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const gvien = await Gvmodel.findOne({
        email : email,
        status : "active"
    })
    if(!gvien){
        req.flash("error","email không chính xác vui lòng nhập lại");
        res.redirect(`/auth/gv/login`)
        return
    }
    if(password != gvien.password){
        req.flash("error","sai mật khẩu");
        res.redirect(`/auth/gv/login`)
        return
    }
    if(gvien.status== "inactive"){
        req.flash("error","Tài Khoản bị Khóa")
        res.redirect(`/auth/gv/login`)
        return
    }
    res.cookie("token",gvien.token)
    res.redirect("/gv/pagehome")
}
//end
// đăng xuất xóa cookies
module.exports.logout = async (req,res)=>{
    res.clearCookie("token")
    res.redirect("/auth/gv/login")
}//end
// lấy lại mạt khẩu
module.exports.forgot = async (req,res)=>{
    res.render("Gv/Page/auth/forgot.pug",{
        pagetitle : "Quên Mk"
    })
}
module.exports.forgotPost = async (req,res)=>{  
    const email = req.body.email;
    const gvien = await Gvmodel.findOne({
        email : email,
        status  : "active"
    })
    if(!gvien){
        req.flash("error","email không chính xác")
        res.redirect("/auth/gv/forgot")
        return
    }
    const otp = ramdom.ramdomNumber(8);
    const otpobj = {
        email : email,
        otp : otp,
        expireAt : Date.now()
    }
    const forgot = new ForgotPsw(otpobj);
    await forgot.save();
    const subject = "Mã otp xác minh lấy lại mật khẩu"
    const html = `Mã OTP để lấy lại mật khẩu : <b>${otp}</b>.Thời hạn 3 phút`;
    sendmail.sendMail(email,subject,html)
    res.redirect(`/auth/gv/otp?email=${email}`)
}
module.exports.otp = async (req,res)=>{
    const email = req.query.email
    res.render("Gv/Page/auth/otp",{
        pagetitle : "Nhập mã Otp",
        email : email
    })
}
module.exports.otpPost = async(req,res)=>{
    const otp = req.body.otp;
    const email = req.body.email;
    const otpPost = await ForgotPsw.findOne({
        email : email,
        otp : otp
    })
    if(!otpPost){
        req.flash("error","vui lòng nhập lại otp hoặc email")
        res.redirect(`/auth/otp?email=${email}`)
        return;
    }
    const gvien = await Gvmodel.findOne({
        email : email,
        status :"active"
    })
    res.cookie("token",gvien.token);
    res.redirect("/auth/gv/reset");
}
module.exports.reset= async (req,res)=>{
    res.render("Gv/Page/auth/reset",{
        pagetitle : "Xác Nhận Mật Khẩu"
    })
}
module.exports.resetPost = async (req,res)=>{
    const password = req.body.password;
    const checkpsw = req.body.checkpsw;
    if(password !== checkpsw){
        req.flash("error","Vui lòng nhập mật khẩu trùng khớp")
        res.redirect("/auth/gv/reset")
        return
    }
    const token = req.cookies.oken;
    await Gvmodel.updateOne(
        {token : token},{
            password : password
        }
    )
    res.redirect("/gv/pagehome")
}//end