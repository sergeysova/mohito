var lib = require('./_lib');
var createProvider = lib.createProvider;

var commands = {
  list: createProvider(require('./list').provider),
  updates: createProvider(require('./updates').provider),
  info: createProvider(require('./info').provider),
};


/**
 * Run command
 */
exports.invokeCommand = function(command, dev, params) {
  if (typeof dev !== 'boolean') dev = false;
  if (typeof params === 'undefined') params = {};

  if (typeof commands[command] !== 'undefined') {
    var provider = commands[command];
    var package = lib.loadPackage();

    lib.currentName(package);
    provider.base(package, params)
    .then(function() {
      if (dev) provider.dev(package, params);
    });
  }
  else {
    console.log('%s %s %s %s', 'Mohito:'.green, 'command'.red, String(command).red.bold, 'not found!'.red);
  }
}


