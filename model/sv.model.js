const mongoose = require("mongoose")
const ramdomToken = require("../helpers/ramdom")
const modelSv = new mongoose.Schema({
    _id : String,
    tensv : String,
    sdt : String,
    email : String,
    password : String,
    tokenSv : {
        type : String,
        default : ramdomToken.ramdomToken(20)
    },
    status : {
        type : String,
        default : "active"
    },
    dsmon :[
        {
            mamh : String,
            tenmh : String
        }
    ]
},{
    timestamps : true
})
const Svmodel = mongoose.model("svien",modelSv , "svien")
module.exports = Svmodel;