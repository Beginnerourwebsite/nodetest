const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.static(path.join(__dirname, "./datafiles")))
// require("path")
app.set('port', process.env.PORT || 3000)

app.get('/insert/:keys/:data', (req, res, next) => {
    let keys = req.params.keys
    let data = req.params.data
    
    let frontend_data = `localStorage.setItem('${keys}', JSON.stringify(${data}))`
    fs.writeFile('./datafiles/sg.js', frontend_data, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
})

app.listen(app.get('port'), () => {
    console.info(`Server listen on port ${app.get('port')}`);
})