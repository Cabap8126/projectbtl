const Svmodel = require("../../model/sv.model");

module.exports.requireAuth = async (req , res , next)=>{
    if(!req.cookies.tokenSv){
        res.redirect("/auth/sv/login")
        return;
    }
    else{
        const tokenSv = req.cookies.tokenSv;
        const user = await Svmodel.findOne({
            tokenSv: tokenSv,
            status: "active"
        }).select("-password")
        if(!user){
            res.redirect("/auth/sv/login")
            return;
        }
        else{
            res.locals.user = user
            next();
        }
    }
}