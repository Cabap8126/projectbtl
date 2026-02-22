const mongoose = require("mongoose")
const forgotPsw = new mongoose.Schema({
    email : String,
    otp : String,
    expireAt : {
        type : Date,
        expires : 10
    }   
    },
    {
        timestamps : true
    }
)
const ForgotPsw = mongoose.model("forgot",forgotPsw,"forgot");
module.exports = ForgotPsw;