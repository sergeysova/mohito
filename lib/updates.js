var getPackageInfo = require('./depend').getPackageInfo;

/**
 * Load updates for
 */
function updatesFor(dependencies, text, callback) {
  if (dependencies) {
    console.log(text + ':');

    var baseUpdates = {};
    var mostLongDep = 3;

    process.stdout.write('  Load ' + text + ' updates');

    return new Promise(function(resolve, reject) {
      if (!dependencies) {
        console.log('keep'.gray);
        return resolve();
      }

      list = Object.keys(dependencies);
      var count = list.length;
      list.map(function(dep) {
        if ((dep.length + dependencies[dep].replace('^', '').length) > mostLongDep) {
          mostLongDep = dep.length + dependencies[dep].replace('^', '').length;
        }

        getPackageInfo(dep).then(function(response){
          process.stdout.write('.');
          baseUpdates[dep] = response;
          count--;
          if (count <= 0) resolve();
        });
      });
    })
    .then(function() {
      console.log('ok'.green);
      console.log();

      try {
        Object.keys(baseUpdates).map(function(dep) {
          var depObj = baseUpdates[dep].data;
          var versionList = Object.keys(depObj.versions);
          var latestVersion = depObj.versions[versionList[versionList.length - 1]];

          var oldVer = String(dependencies[dep]).replace('^', '');
          var newVer = latestVersion.version;
          var result = 'actual'.gray;
          if (oldVer.replace('.*', '') != newVer) {
            result = ('new '.green + String(newVer).yellow);
          }

          var spaces = Array(mostLongDep - dep.length - oldVer.length + 3).join(' ');
          console.log('  %s@%s %s %s', dep.gray, oldVer.yellow, spaces, result);
        });

      } catch (e) {
        console.error('ERROR:', e, e.stack);
        throw e;
      }
    }).catch(function(e) {
      throw e;
    });
  }
}


/**
 * @param  {[type]} pkg [description]
 * @return {[type]}     [description]
 */
function updates(pkg) {
  if (pkg.dependencies) {
    return updatesFor(pkg.dependencies, 'base');
  }
  else return new Promise(function(r) {r()});
}
exports.base = updates;

/**
 * @param  {[type]} pkg [description]
 * @return {[type]}     [description]
 */
function updatesDev(pkg) {
  if (pkg.devDependencies) {
    return updatesFor(pkg.devDependencies, 'dev');
  }
  else return new Promise(function(r) {r()});
}
exports.dev = updatesDev;
