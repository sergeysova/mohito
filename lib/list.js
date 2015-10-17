/**
 * show specified list of dependencies
 * @param  {[type]} dependencies [description]
 * @param  {[type]} text         [description]
 * @return {[type]}              [description]
 */
function listFor(dependencies, text) {
  console.log(text + ':');
  Object.keys(dependencies).map(function(dep) {
    var ver = dependencies[dep].replace('^', '');
    console.log('  %s@%s', dep.gray, String(ver).yellow);
  })
}

/**
 * @param  {[type]} pkg [description]
 * @return {[type]}     [description]
 */
function list(pkg) {
  if (pkg.dependencies) {
    listFor(pkg.dependencies, 'base');
  }
}
exports.base = list;

function listDev(pkg) {
  if (pkg.devDependencies) {
    listFor(pkg.devDependencies, 'dev');
  }
}
exports.dev = listDev;