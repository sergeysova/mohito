

function infoFor(dependencies, text) {
  return new Promise(function(resolve, reject) {
    console.log(text);
  });
}

exports.provider = infoFor;