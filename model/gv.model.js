const mongoose = require("mongoose")
const ramdomToken = require("../helpers/ramdom")
const modelgv = new mongoose.Schema({
    _id : String,
    tenGv : String,
    monday :[
        {
            maMd : String,
            tenMd : String
        }
    ],
    lichgiang : String,
    email : String,
    password : String,
    token : {
        type : String,
        default : ramdomToken.ramdomToken(20)
    },
    status : {
        type : String,
        default : "active"
    }
},{
    timestamps : true
})
const Gvmodel = mongoose.model("gvien",modelgv,"gvien")
module.exports = Gvmodel