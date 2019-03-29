// #! /usr/bin/env node

var request = require('request');
var process = require('process');
var fs = require('fs');
var program = require('commander');
var pkg = require('./package.json');
var path = require('path');

/**
 * 获取文件名
 */
function getFileName(filePath) {
    let baseName = path.basename(filePath);
    return baseName;
}

program
.version(pkg.version, '-v, --Version')
.usage('[options] <file ...>')
.option('-l, --host [value]', 'host url')
.option('-a, --api [value]', 'api address')
.option('-c, --cookie [value]', 'request cookie')
.option('-f, --file [value]', 'will post file name')
.on('--help', function () {
    console.log('');
    console.log('Examples:');
    console.log('  postfile --help');
    console.log('  postfile -h');
})
program.parse(process.argv);

var HOST_URL = program.host;
var UPLOAD_URL = HOST_URL + program.api;

let j = request.jar();
let cookie = request.cookie(program.cookie)
j.setCookie(cookie, HOST_URL, function (err, cookie) {
    console.log(err);
    console.log(cookie);
});

const re = request.post({url:UPLOAD_URL, jar: j } ,function(err, httpResponse, body) {
     console.log("error", err);
     console.log('statusCode', httpResponse && httpResponse.statusCode);
     console.log('body', body);
})

const form = re.form();
form.append('id', 'WU_FILE_1');
form.append('name', getFileName(program.file));
form.append('file', fs.createReadStream(__dirname + '\\' +program.file), {filename: getFileName(program.file)});
