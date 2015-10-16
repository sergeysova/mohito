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

program
  .version(require('../package.json').version)
  .usage('<command> [options]')
  .option('--safe', 'Open confirm request for each version');

program
  .command('list')
  .description('Show all package dependencies')
  .action(function(env) {
    console.log('Show dependencies list')
  });

program
  .command('updates')
  .description('Load updates for your dependencies')
  .action(function(env) {
    console.log('Start loading dependencies updates')
  });

program
  .command('upgrade [package@1.0.0]')
  .description('Update dependency or all dependencies')
  .option('--safe', 'Check each dependency')
  .action(function(package, env) {
    if (package) {
      var pv = package.split('@');
      if (pv.length > 1) {
        package = pv[0] + ' to ' + pv[1];
      }
    }
    console.log('Start upgrade', package || 'all', program.safe ? 'safely' : 'unsafe');
  });


program.parse(process.argv);