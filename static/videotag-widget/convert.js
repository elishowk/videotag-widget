var args = process.argv.slice(2);
var fs = require('fs');
var str;

if (args.length === 0) {
    console.log('Usage: node convert.js FILE [FILE, ...]');

    process.exit(1);
}

args.forEach(function (file) {
    if (! fs.statSync(file).isFile()) {
        console.log(file + ' is not a file');

        process.exit(2);
    }

    str = fs.readFileSync(file) + '';
    str = 'define(function () { return \'' + str.replace(/'/g, '\\\'').replace(/\r\n|\r|\n/g, '\\n') + '\';});';

    console.log('writing: ' + file + '.js');
    fs.writeFileSync(file + '.js', str);
});
