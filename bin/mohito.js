#!/usr/bin/env node

var program = require('commander');
var path = require('path');
var fs = require('fs');
var colors = require('colors');

var commands = require('../lib/_index');


program
  .version(require('../package.json').version)
  .usage('<command> [options]')
  .option('--safe', 'Open confirm request for each version'.green)
  .option('--dev', 'Apply command for devDependencies too'.green);

program
  .command('help')
  .action(function() {
    program.help();
  });

program
  .command('info <package>')
  .description('Show info about single package')
  .action(function(p, env) {
    commands.invokeCommand('info', true, {name: p});
  });

program
  .command('list')
  .description('Show all package dependencies')
  .action(function(env) {
    commands.invokeCommand('list', program.dev, env);
  });

program
  .command('updates')
  .description('Load updates for your dependencies')
  .action(function(env) {
    commands.invokeCommand('updates', program.dev, env);
  });

program
  .command('upgrade [package@1.0.0]')
  .description('Update dependency or all dependencies (UNRELEASED)'.red)
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
