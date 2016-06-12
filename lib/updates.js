var getPackageInfo = require('./_lib').getPackageInfo;
var obs = require('observatory').settings({ prefix: '› '.green })

/**
 * Load updates for
 */
function updatesFor(dependencies, text) {
  if (dependencies) {
    var mostLongDep = 3;

    return new Promise(function(resolve, reject) {
      if (!dependencies) {
        return resolve();
      }

      list = Object.keys(dependencies);
      var count = list.length;
      list.map(function(dep) {
        if ((dep.length + dependencies[dep].replace('^', '').length) > mostLongDep) {
          mostLongDep = dep.length + dependencies[dep].replace('^', '').length;
        }

        var task = obs.add(dep + (text === 'dev' ? '  --dev'.gray : ''));
        task.status('Loading from npm...'.gray);

        getPackageInfo(dep)
        .then(function(response){
          var depObj = response.data;
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

          count--;
          if (count <= 0) resolve();
        })
        // .catch(err, function() {
        //   return reject(err);
        // });
      });
    })
    .catch(function(e) {
      throw e;
    });
  }
}

exports.provider = updatesFor;
