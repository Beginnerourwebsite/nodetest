const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000)

app.get('/amit', (req, res, next) => {
    res.send('<h1>Hello world<h1>');
})

app.listen(app.get('port'), () => {
    console.info(`Server listen on port ${app.get('port')}`);
})



        console.log(
            new Date().getDate() +"-"+
            (new Date().getMonth()+1) +"-"+
            new Date().getMilliseconds()
        )