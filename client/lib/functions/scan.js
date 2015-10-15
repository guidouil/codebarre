scan = function () {
  cordova.plugins.barcodeScanner.scan(
    function (result) {
      if (result) {
        searchEan(result);
      }
    },
    function (error) {
      alert('Scanning failed: ' + error);
    }
  );
};

var searchEan = function (scanned) {
  if (scanned.format && scanned.format.search('EAN') !== -1) {
    Meteor.call('searchEan', scanned, function (error, result) {
      if (error) {
        alert('error' + error);
      }
      if (result) {
        alert('result' + result);
      }
    });
  } else {
    Barcodes.insert({
      value: scanned.text,
      format: scanned.format,
      createdAt: new Date(),
      product: {name:'not', brands:'EAN'}
    });
  }
};
