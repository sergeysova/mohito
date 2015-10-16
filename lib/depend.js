var q = require('ajax-promise');

var API = 'http://registry.npmjs.org/';

/**
 * @param  {[type]} pkg [description]
 * @return {[type]}     [description]
 */
function currentName(pkg) {
  if (!pkg.name) pkg.name = '<unnamed>';
  if (!pkg.version) pkg.version = '<0.0.0>';
  pkg.version = String(pkg.version).replace('^', '');
  console.log('Package: %s@%s', String(pkg.name).gray, pkg.version.yellow)
}
exports.currentName = currentName;

/**
 * @param  {[type]} pkg [description]
 * @return {[type]}     [description]
 */
function list(pkg) {

  if (pkg.dependencies) {
    console.log('base');
    Object.keys(pkg.dependencies).map(function(dep) {
      var ver = pkg.dependencies[dep].replace('^', '');
      console.log('  %s@%s', dep.gray, String(ver).yellow);
    })
  }

  if (pkg.devDependencies) {
    console.log('dev');
    Object.keys(pkg.devDependencies).map(function(dep) {
      var ver = pkg.devDependencies[dep].replace('^', '');
      console.log('  %s@%s', dep.gray, String(ver).yellow);
    })
  }
}
exports.list = list;


/**
 * @param  {[type]} package [description]
 * @return {[type]}         [description]
 */
function getPackageInfo(package) {
}
exports.getPackageInfo = getPackageInfo;


/**
 * @param  {[type]} pkg [description]
 * @return {[type]}     [description]
 */
function updates(pkg) {

}
exports.updates = updates;

