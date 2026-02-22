const mongoose = require("mongoose")
const monhc = new mongoose.Schema({
    _id : String,
    tenmh : String
})
const Monhcmodel = mongoose.model("monhc",monhc , "monhc")
module.exports = Monhcmodel;