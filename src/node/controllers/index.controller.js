var cmd = require('child_process'),
    http = require('https'),
    request = require('request'),
    config = require('../../../config/config'),
    YQL = require('yql');
var min = 0;
var max = 5;
fs = require('fs');
function checkCatchPhrase(speech) {
    var START_TIME = new Date().getTime();
    var phrases = require('../../../config/phrases');
console.log(speech)
    for (var i = 0; i < phrases.length; i++) {
        if (speech.indexOf(phrases[i].toLowerCase().replace(/\s+/g, '')) !== -1) {
            return true;
        }
    }
    return false;
}
function actualDifference(string, string2) {

    var string3 = ['', '']
    if (string != '')
        string = string.replace(/\s+/g, '')
    string2 = string2.replace(/\s+/g, '')

    if (string)
        string3 = string.split(string2)


    return string3[1]
}
var oldData = ''
var oldWord = '';
fs.watch(process.cwd() + '/words.log', function (event, filename) {
    var timer = new Date().getTime();
    fs.readFile(process.cwd() + '/words.log', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        var datas = actualDifference(data, oldData)
        oldData = data;
        if (oldWord != datas && isNaN(parseInt(datas)) == false) {
            oldWord = datas;
            exports.sendVoice(datas)
        }
    });
});


var timer = new Date().getTime();
var oldData2 = ''
var newFlag = false;

console.log('1');

// Connect to server
var io = require('socket.io-client')
var socket = io.connect(config.host_ip + ":" + config.host_port, {reconnect: true});

console.log('2');

// Add a connect listener
socket.on('connect', function(socket) {
    console.log('Connected!');
});

console.log('3');
exports.sendVoice = function (voice) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    process.time = new Date().getTime();
        console.log('voice ' + voice)

    var url = config.host_ip + ":" + config.host_port + "/sendSpeech/" + voice;
    //http.get(url, function(res) {
    //    console.log("TOTAL TIME " + (new Date().getTime() - process.time))
    //}).on('error', function(e) {
    //    // Call callback function with the error object which comes from the request
    //});
    socket.emit('updateMessage',voice);
    socket.on ('messageSuccess', function (data) {

        
    });
}

