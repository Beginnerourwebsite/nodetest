

const express = require('express');
const app = express();
const os = require('node:os');
const batteryLevel = require('battery-level');
var useragent = require('express-useragent');

app.use(useragent.express());
app.get('/DATA', function (req, res) {
    res.send(req.useragent["isDesktop"]); //DEVICE DETAILS
});
app.set('port', process.env.PORT || 3000)
app.get('/', async (req, res, next) => {
    let obj = [
        { "Desktop_device_specification": {} },
        { "Window_device_specification": {} },
        { "Desktop_user_Details": {} },
    ]
    //  data category wise (start)
    let Desktopdevicedata = obj[0].Desktop_device_specification
    let DesktopWindowdetails = obj[1].Window_device_specification
    let Desktop_user_Details = obj[2].Desktop_user_Details
    //  data category wise (end)


    // Desktop_device_specification code (start)
    Desktopdevicedata.Device_Name = os.hostname()
    Desktopdevicedata.Procesor = os.cpus()[0].model
    Desktopdevicedata.System_type = os.arch() + "-based processor"
    Desktopdevicedata.Installe_Ram = Math.floor((os.totalmem()) / 1000000000) + ".00 GB"
    Desktopdevicedata.Free_Ram = Math.floor((os.freemem()) / 1000000) + ".00 mb"
    // Desktop_device_specification code (end)


    // Window_device_specification code (start)
    DesktopWindowdetails.Edition = os.version()
    // Window_device_specification code (end)


    // Desktop_user_Details code (start)
    Desktop_user_Details.User_name = os.userInfo().username
    Desktop_user_Details.Temporary_file_location = os.tmpdir()
    Desktop_user_Details.Home_dir = os.homedir()
    let batterystatus= await batteryLevel()// bettry status
    Desktop_user_Details.Battery_status =batterystatus


    let arr = []
    Object.keys(os.networkInterfaces()).map((data, index) => {
        let alldata = { [data]: os.networkInterfaces()[data][(os.networkInterfaces()[data].length - 1)] }
        arr.push(alldata)
    })
    Desktop_user_Details.Total_user = os.constants.signals.SIGHUP
    Desktop_user_Details.Network = arr
     
    // Desktop_user_Details code (end)

    res.send(obj)

        
    res.end()
})

app.listen(app.get('port'), () => {
    console.info(`Server listen on port ${app.get('port')}`);
})