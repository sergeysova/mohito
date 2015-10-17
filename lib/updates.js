var getPackageInfo = require('./_lib').getPackageInfo;

/**
 * Load updates for
 */
function updatesFor(dependencies, text) {
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

exports.provider = updatesFor;
