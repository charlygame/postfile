#! /usr/bin/env node

var request = require('request');
var process = require('process');
var fs = require('fs');
var program = require('commander');
var pkg = require('./package.json');
// request('http://www.google.com', function (error, response, body) {

//     console.log("error", error);
//     console.log('statusCode', response && response.statusCode);
//     console.log('body', body);
// });

// if (process.argv.length < 3) {
//     console.log('请输入要上传的文件');
//     return;
// }

// /**
//  * 获取文件名
//  */
// function getFileName() {

//     const WIN_PLATFORM = 'win32';
//     const MAC_PLATFORM = 'darwin';
//     let fileName = '';
//     if (process.platform == MAC_PLATFORM) {
//         fileName = process.argv[2].replace(__dirname + '/', '');
//     } else if (process.platform == WIN_PLATFORM) {
//         fileName = process.argv[2].replace(__dirname + '\\', '');
//     }
//     return fileName;
// }

// var HOST_URL = 'http://dev.yunyun-local.com:8086/';
// var UPLOAD_URL = HOST_URL + "admin/source/uploadOwner";

// const re = request.post(HOST_URL, function(err, httpResponse, body) {
//      console.log("error", err);
//      console.log('statusCode', httpResponse && httpResponse.statusCode);
//      console.log('body', body);
// })

// request.jar().setCookie('fa668RRGCy23DokfCl9SQ7vK7mdAXFBq3yBwtRimAFOtu7HWejYTMRHvbDx9hGcZVi1wKQ7E2mEX7HO4A' , HOST_URL);
// const form = re.form();
// form.append('id', 'WU_FILE_1');
// console.log(getFileName());
// form.append('name', getFileName());
// console.log(process.argv[2]);

// form.append('file', fs.createReadStream(process.argv[2]), {filename: getFileName()});




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

const re = request.post(HOST_URL, function(err, httpResponse, body) {
     console.log("error", err);
     console.log('statusCode', httpResponse && httpResponse.statusCode);
     console.log('body', body);
})

request.jar().setCookie(program.cookie, HOST_URL);
const form = re.form();
form.append('id', 'WU_FILE_1');
console.log(getFileName());
form.append('name', getFileName());
console.log(process.argv[2]);

form.append('file', fs.createReadStream(process.argv[2]), {filename: getFileName()});


