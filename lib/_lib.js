var Q = require('axios');
var path = require('path');
var fs = require('fs');

if (!Promise) {
  global.Promise = require('promise');
}

// NPM registry host
var API = module.exports.API = 'http://registry.npmjs.org/';

exports.loadPackage = function() {
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

  return require(currentPackage);
}


/**
 * Request package info from npm.registry
 * @param  {[type]} package [description]
 * @return {[type]}         [description]
 */
exports.getPackageInfo = function (package) {
  return Q.get(API + package);
}


/**
 * @param  {[type]} pkg [description]
 * @return {[type]}     [description]
 */
exports.currentName = function (pkg) {
  if (!pkg.name) pkg.name = '<unnamed>';
  if (!pkg.version) pkg.version = '<0.0.0>';
  pkg.version = String(pkg.version).replace('^', '');
  console.log('%s %s@%s', 'Package:'.gray, String(pkg.name).cyan, pkg.version.yellow)
}


/**
 *
 * @param  {Function} rawProvider
 * @return {Object}             { base: Function, dev: Function }
 */
exports.createProvider = function (rawProvider) {
  return {
    base: function(package, options) {
      if (package.dependencies) {
        return rawProvider(package.dependencies, 'base', options);
      }
    },
    dev: function(package, options) {
      if (package.devDependencies) {
        return rawProvider(package.devDependencies, 'dev', options);
      }
    }
  };
}


