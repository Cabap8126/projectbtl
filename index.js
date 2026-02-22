const express = require("express")
const app = express()
const dotenv = require("dotenv")
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const session = require("express-session")
const flash = require('express-flash')
dotenv.config();
const database = require("./config/connect")
database.connect();
const port = process.env.PORT
const routerGv = require("./router/gv/index")
const routerSv = require("./router/sv/index")
app.set('views',`${__dirname}/views`)
app.set('view engine','pug')
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({extended : false}))
app.use(cookieParser('abcxyz'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
//router
routerGv(app)
routerSv(app)
// end
// static
app.use(express.static("public"));
//end
app.listen(port , ()=>{
    console.log(`Example app listening on port ${port}`)
})
