const express = require('express');
let mysql=require("mysql")
const app = express();
let con=mysql.createConnection({
    user:"pan123",
    password:null,
    host:"db4free.net/phpMyAdmin/index.php"

})
con.connect(err=>{
    if(err)console.log(err)
    else console.log("done")
})
app.set('port', process.env.PORT || 3000) 

app.get('/', (req, res, next) => {
    res.send('<h1>Hello world<h1>');
})

app.listen(app.get('port'), () => {
    console.info(`Server listen on port ${app.get('port')}`);
})