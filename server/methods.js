Meteor.methods({
  searchEan: function (codeEan, scanId) {
    var response = HTTP.get('http://world.openfoodfacts.org/api/v0/product/' + codeEan + '.json');
    if (response && response.statusCode === 200 && response.data && response.data.status === 1) {
      Barcodes.update({ _id: scanId }, {$set: { product: response.data.product }});
      return true;
    } else {
      return false;
    }
  }
});
