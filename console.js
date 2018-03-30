#!/usr/bin/env node
"use strict";
var program = require('commander');

function btoa(str) {
    return Buffer.from(str).toString('base64');
}

program.version('0.1.0');
program.command('rewriteuri <uri>')
    .description('my first cli command')
    .action(function(uri) {
        console.log((function b64Encode(str) {
            // first we use encodeURIComponent to get percent-encoded UTF-8,
            // then we convert the percent encodings into raw bytes which
            // can be fed into btoa.
            var end = btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
                function toSolidBytes(match, p1) {
                    end = String.fromCharCode('0x' + p1);
                }));
            return uri + end;
        })(uri));
    });

program.parse(process.argv);
