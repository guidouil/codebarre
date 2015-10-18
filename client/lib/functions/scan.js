scan = function () {
  cordova.plugins.barcodeScanner.scan(
    function (result) {
      if (result && result.text && result.format) {
        var scanId = Scans.insert({
          value: result.text,
          format: result.format,
          createdAt: new Date(),
          product: {name:'', brands:''}
        });
        if (result.format.search('EAN') !== -1) {
          // Search product
          Meteor.call('searchEan', result.text, scanId);
          // ask for price
          Router.go('/scan/' + scanId);
        }
      }
    },
    function (error) {
      alert('Scanning failed: ' + error);
    }
  );
};
