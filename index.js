const express = require("express")
const app = express() // cài đặt express
const dotenv = require("dotenv") // cài dotenv
const bodyParser = require('body-parser'); // thư viện để lấy data từ form
const cookieParser = require("cookie-parser"); // lưu cookies vào trang
const session = require("express-session") 
const flash = require('express-flash') // gửi kèm thông báo
dotenv.config();// env
const database = require("./config/connect")
database.connect(); // kết nối database
const port = process.env.PORT || 3000;
const routerGv = require("./router/gv/index") // router Gvien
const routerSv = require("./router/sv/index") // router svien
app.set('views',`${__dirname}/views`)
app.set('view engine','pug')
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({extended : false})) // cho phép lấy data từ form
app.use(cookieParser('abcxyz')); // cookies
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
//router
routerGv(app)
routerSv(app)
// end
// app.listen(port , ()=>{
//     console.log(`Example app listening on port ${port}`)
// })
module.exports = app;