var cmd = require('child_process'),
    http = require('http'),
    request = require('request'),
    config = require('../../../config/config'),
     YQL = require('yql');
var min = 0;
var max = 5;
fs = require('fs');
function actualDifference(string, string2) {

    if (string)
        string3= string.split(string2)

    return string3[1]
}
var oldData = ''
fs.watch(process.cwd()+'/words.log', function (event, filename) {
    console.log('event is: ' + event);
    var timer = new Date().getTime();
    fs.readFile(process.cwd() + '/words.log', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        var datas = actualDifference(data, oldData)
        console.log("DATA:" + data)
        var req = {}
        req.body = {}
        req.body.speech = datas;
        oldData = data;
        exports.sendVoice(datas)

    });
});
exports.sendVoice = function(voice) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    request.post(config.host_ip+":"+config.host_port+'/sendSpeech', {speech: voice}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
        }
    })
}
