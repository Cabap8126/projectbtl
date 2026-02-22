const mongoose = require("mongoose")
module.exports.connect = async (req,res)=>{
    try{
        await mongoose.connect(process.env.MONGOOSEURL)
        console.log("connect success")
    }catch(error){
        console.log("connect error")
    }
}