const Svmodel = require("../../model/sv.model");
const ForgotPsw = require("../../model/forgot.model")
const ramdom = require("../../helpers/ramdom")
const sendmail = require("../../helpers/sendmail")
module.exports.login = async (req,res)=>{
    if(req.cookies.token){
        res.redirect("/sv/pagehome")
    }
    else{
        res.render("sv/Page/auth/login",{
            pagetitle : "Trang đăng nhập"
        })        
    }

}
module.exports.loginPost = async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const svien = await Svmodel.findOne({
        email : email,
        status : "active"
    })
    if(!svien){
        req.flash("error","email không chính xác vui lòng nhập lại");
        res.redirect(`/auth/sv/login`)
        return
    }
    if(password != svien.password){
        req.flash("error","sai mật khẩu");
        res.redirect(`/auth/sv/login`)
        return
    }
    if(svien.status== "inactive"){
        req.flash("error","Tài Khoản bị Khóa")
        res.redirect(`/auth/sv/login`)
        return
    }
    res.cookie("token",svien.token)
    res.redirect("/sv/pagehome")
}
module.exports.logout = async (req,res)=>{
    res.clearCookie("token")
    res.redirect("/auth/sv/login")
}
module.exports.forgot = async (req,res)=>{
    res.render("sv/Page/auth/forgot.pug",{
        pagetitle : "Quên Mk"
    })
}
module.exports.forgotPost = async (req,res)=>{  
    const email = req.body.email;
    const svien = await Svmodel.findOne({
        email : email,
        status  : "active"
    })
    if(!svien){
        req.flash("error","email không chính xác")
        res.redirect("/auth/sv/forgot")
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
    res.redirect(`/auth/sv/otp?email=${email}`)
}
module.exports.otp = async (req,res)=>{
    const email = req.query.email
    res.render("sv/Page/auth/otp",{
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
    const svien = await Svmodel.findOne({
        email : email,
        status :"active"
    })
    res.cookie("token",svien.token);
    res.redirect("/auth/sv/reset");
}
module.exports.reset= async (req,res)=>{
    res.render("sv/Page/auth/reset",{
        pagetitle : "Xác Nhận Mật Khẩu"
    })
}
module.exports.resetPost = async (req,res)=>{
    const password = req.body.password;
    const checkpsw = req.body.checkpsw;
    if(password !== checkpsw){
        req.flash("error","Vui lòng nhập mật khẩu trùng khớp")
        res.redirect("/auth/sv/reset")
        return
    }
    const token = req.cookies.oken;
    await Svmodel.updateOne(
        {token : token},{
            password : password
        }
    )
    res.redirect("/sv/pagehome")
}