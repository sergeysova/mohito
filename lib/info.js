var getPackageInfo = require('./_lib').getPackageInfo;
var founded = false;


function infoFor(dependencies, text, params) {

  var target = params.name;
  var place = 'dependencies'.green;
  var currentVer = String(dependencies[target]).replace('^', '');
  if (text == 'dev') {
    place = 'devDependencies'.cyan;
  }

  return new Promise(function(resolve, reject) {
    var inDep = dependencies[target];
    if (inDep) {
      console.log('  Installed: %s@%s in %s', target.cyan, currentVer.replace('^', '').yellow, place);
      founded = true;
    }
    resolve();
  })
  .then(function() {
    if (founded) {
      console.log('');
      process.stdout.write('  Get latest versions');

      return new Promise(function(resolve) {
        process.stdout.write('...');
        founded = false;

        getPackageInfo(target).then(function(response) {
          process.stdout.write('ok\n\n'.green);
          process.stdout.write('  List of versions of <' + target.cyan + '> is from ' + String(dependencies[target]).replace('^', '').yellow);

          response = response.data;
          var verList = Object.keys(response.versions);
          var latest = response.versions[verList[verList.length - 1]];

          console.log(' to %s', String(latest.version).yellow);

          try {
            var show = currentVer ? false : true;
            for (var i = 0, len = verList.length; i < len; i ++) {
              var ver = response.versions[verList[i]];
              if (currentVer == latest.version && ver.version == currentVer) {
                process.stdout.write('   actual > '.green);
                show = true;
              }
              else if (ver.version == currentVer) {
                process.stdout.write('  current > '.yellow);
                show = true;
              }
              else if (ver.version == latest.version) {
                process.stdout.write('   latest > '.green);
              }
              else {
                if (show) process.stdout.write('            ');
              }

              if (show) console.log('%s %s', '*'.gray, String(ver.version).yellow);
            }
            console.log();
            if (latest.homepage) {
              console.log('  Please read <%s> docs before update:', target.yellow);
              console.log(' ',latest.homepage);
            }
          }
          catch (e) {
            console.log('Error:', e, e.stack);
          }

          resolve();
        });
      });
      return true;
    }

    founded = false;
    return new Promise(function(r){r()});
  });
}

exports.provider = infoFor;