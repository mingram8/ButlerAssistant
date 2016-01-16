var cmd = require('child_process'),
    http = require('http'),
    request = require('request'),
    config = require('../../../config/config'),
    YQL = require('yql');
var min = 0;
var max = 5;
fs = require('fs');
function actualDifference(string, string2) {

    var string3 = ['', '']
    if (string != '')
    string =  string.replace(/\s+/g, '')
    string2 = string2.replace(/\s+/g, '')

    if (string)
        string3 =string.split(string2)


    return string3[1]
}
var oldData = ''
fs.watch(process.cwd() + '/words.log', function (event, filename) {
    var timer = new Date().getTime();
    fs.readFile(process.cwd() + '/words.log', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        var datas = actualDifference(data, oldData)
        oldData = data;
        exports.sendVoice(datas)

    });
});


var timer = new Date().getTime();
var oldData2 = ''
var newFlag = false;

var time = new Date().getTime();

exports.sendVoice = function (voice) {
    console.log('voice ' + voice)
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    request.post(config.host_ip + ":" + config.host_port + '/sendSpeech', {form: {speech: voice}}, function (error, response, body) {
        console.log(error)
        if (!error && response.statusCode == 200) {
        }
    })
}

