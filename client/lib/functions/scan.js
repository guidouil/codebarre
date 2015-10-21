scan = function () {
  cordova.plugins.barcodeScanner.scan(
    function (result) {
      if (result && result.text && result.format) {
        // insert Scan
        var scanId = Scans.insert({
          value: result.text,
          format: result.format,
          product: {name:'', brands:''}
        });
        // search product
        Meteor.call('searchProductCode', result.text, result.format, scanId);
        // ask for price
        Router.go('/scan/' + scanId);
      }
    },
    function (error) {
      alert('Scanning failed: ' + error);
    }
  );
};
