var getPackageInfo = require('./_lib').getPackageInfo;
var obs = require('observatory').settings({ prefix: '› '.green })

/**
 * Load updates for
 */
function updatesFor(dependencies, text) {
  if (dependencies) {
    // console.log(text + ':');

    var baseUpdates = {};
    var mostLongDep = 3;

    // process.stdout.write('  Load ' + text + ' updates');

    return new Promise(function(resolve, reject) {
      if (!dependencies) {
        // console.log('keep'.gray);
        return resolve();
      }

      list = Object.keys(dependencies);
      var count = list.length;
      list.map(function(dep) {
        if ((dep.length + dependencies[dep].replace('^', '').length) > mostLongDep) {
          mostLongDep = dep.length + dependencies[dep].replace('^', '').length;
        }

        var task = obs.add(dep);
        task.status('Loading from npm...'.gray);

        getPackageInfo(dep).then(function(response){
          // process.stdout.write('.');
          baseUpdates[dep] = {
            task: task,
            response: response,
          };
          count--;
          if (count <= 0) resolve();
        });
      });
    })
    .then(function() {

      try {
        Object.keys(baseUpdates).map(function(dep) {
          var depObj = baseUpdates[dep].response.data;
          var task = baseUpdates[dep].task;
          var versionList = Object.keys(depObj.versions);
          var latestVersion = depObj.versions[versionList[versionList.length - 1]];

          var oldVer = String(dependencies[dep]).replace('^', '');
          var newVer = latestVersion.version;
          var result = 'actual'.gray;

          if (oldVer.replace('.*', '') != newVer) {
            result = ('new '.green + String(newVer).yellow);
          }

          task.details('   ' + result);
          task.status(oldVer.yellow);
        });

      }
      catch (e) {
        console.error('ERROR:', e, e.stack);
        throw e;
      }
    }).catch(function(e) {
      throw e;
    });
  }
}

exports.provider = updatesFor;
