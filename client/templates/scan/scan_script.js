Template.scan.helpers({
});

Template.scan.events({
  'click #scan': function () {
    cordova.plugins.barcodeScanner.scan(
      function (result) {
        alert('We got a barcode\n' +
        'Result: ' + result.text + '\n' +
        'Format: ' + result.format + '\n' +
        'Cancelled: ' + result.cancelled);
      },
      function (error) {
        alert('Scanning failed: ' + error);
      }
    );
  }
});

Template.scan.onRendered(function ( ){
});
