#!/usr/bin/env node

var program = require('commander');
var path = require('path');
var fs = require('fs');

var currentPackage = path.join(process.cwd(), 'package.json');

try {
  var packStat = fs.lstatSync(currentPackage);
  if (!packStat.isFile()) {
    throw new Error();
  }
}
catch (err) {
  console.error('Error: current directory is not NPM package.');
}

