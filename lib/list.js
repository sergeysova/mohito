/**
 * show specified list of dependencies
 * @param  {[type]} dependencies [description]
 * @param  {[type]} text         [description]
 * @return {[type]}              [description]
 */
function listFor(dependencies, text) {
  return new Promise(function(resolve, reject){
    console.log(text + ':');
    Object.keys(dependencies).map(function(dep) {
      var ver = dependencies[dep].replace('^', '');
      console.log('  %s@%s', dep.gray, String(ver).yellow);
    });
    resolve();
  });
}


exports.provider = listFor;