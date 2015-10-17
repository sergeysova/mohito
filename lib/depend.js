var Q = require('axios');

if (!Promise) {
  global.Promise = require('promise');
}

// NPM registry host
var API = module.exports.API = 'http://registry.npmjs.org/';


/**
 * Request package info from npm.registry
 * @param  {[type]} package [description]
 * @return {[type]}         [description]
 */
exports.getPackageInfo = function (package) {
  return Q.get(API + package);
}



