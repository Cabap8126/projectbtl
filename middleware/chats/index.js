const Svmodel = require("../../model/sv.model")
const Gvmodel = require("../../model/gv.model");
module.exports.requireAuth = async (req , res , next)=>{
    if(req.cookies.tokenGv){
        const tokenGv = req.cookies.tokenGv;
        const user = await Gvmodel.findOne({
            tokenGv: tokenGv,
            status: "active"
        }).select("-password")
        res.locals.user = user
        next();
    }
    else{
        const tokenSv = req.cookies.tokenSv;
        const user = await Svmodel.findOne({
            tokenSv: tokenSv,
            status: "active"
        }).select("-password")
        res.locals.user = user
        next();
    }
}