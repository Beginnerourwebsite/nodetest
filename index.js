const express = require('express');
const app = express();
let path = require("path")
let multer = require("multer")
app.use(express.urlencoded({ extended: false }))
app.set('port', process.env.PORT || 3000)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './datafiles')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, new Date().getDate() + "-" +
            (new Date().getMonth() + 1) + "-" +
            new Date().getMilliseconds() + "-" +file.originalname)
    }
})
const upload = multer({ storage: storage })

let mainfolderpath = path.join(__dirname, "./datafiles")
app.use(express.static(mainfolderpath))



app.post('/data', upload.single("user"), (req, res, next) => {
  let obj={
    Download_link:`http://localhost:3000/${req.file.filename}`
  }
  
    res.send(obj)
    res.end()

})
app.get('/get', (req, res, next)=>{
    res.attachment(mainfolderpath+"/index.html")
    res.end()
})
// console.log(mainfolderpath)

app.listen(app.get('port'), () => {
    console.info(`Server listen on port ${app.get('port')}`);
})
