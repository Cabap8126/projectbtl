const Svmodel = require("../../model/sv.model");

module.exports.requireAuth = async (req , res , next)=>{
    if(!req.cookies.token){
        res.redirect("/auth/sv/login")
        return;
    }
    else{
        const token = req.cookies.token;
        const svien = await Svmodel.findOne({
            token: token,
            status: "active"
        }).select("-password")
        if(!svien){
            res.redirect("/auth/sv/login")
            return;
        }
        else{
            res.locals.svien = svien
            next();
        }
    }
}