scan = function () {
  cordova.plugins.barcodeScanner.scan(
    function (result) {
      if (result && result.text && result.format) {
        var scanId = Barcodes.insert({
          value: result.text,
          format: result.format,
          createdAt: new Date(),
          product: {name:'', brands:''}
        });
        if (result.format.search('EAN') !== -1) {
          Meteor.call('searchEan', result.text, scanId, function (error, result) {
            if (error) {
              // alert('error' + error);
            }
            if (result) {
              // alert('result' + result);
            }
          });
        }
      } else {
        alert('Scanning failed: ' + result);
      }
    },
    function (error) {
      alert('Scanning failed: ' + error);
    }
  );
};
