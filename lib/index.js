require('./depend');

/**
 * @param  {[type]} pkg [description]
 * @return {[type]}     [description]
 */
function currentName(pkg) {
  if (!pkg.name) pkg.name = '<unnamed>';
  if (!pkg.version) pkg.version = '<0.0.0>';
  pkg.version = String(pkg.version).replace('^', '');
  console.log('%s %s@%s', 'Package:'.gray, String(pkg.name).cyan, pkg.version.yellow)
}
exports.currentName = currentName;


// command LIST
exports.list = require('./list').base;
exports.listDev = require('./list').dev;


// command UPDATES
exports.updates = require('./updates').base;
exports.updatesDev = require('./updates').dev;