const mongoose = require("mongoose")
const classPr = new mongoose.Schema({
    _id : String,
    magv : String,
    nameCls : String,
    mamh : String,
    dssv :[
        {
            room_id : String,
            masv : String,
            cc1 : Number,
            cc2 : Number,
            th1 : Number,
            th2 : Number,
        }
    ],
    status : {
        type : String,
        default : "active"
    },
    dsfile : [
        {
            tenfile : String,
            path : String
        }
    ],
    tbao : [
        {
            title : String,
            noidung : String
        }
    ]
})
const ClasPr = mongoose.model("classpr",classPr,"classpr")
module.exports = ClasPr