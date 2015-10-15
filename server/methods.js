Meteor.methods({
  searchEan: function (codeEan, scanId) {
    var fact = HTTP.get('http://world.openfoodfacts.org/api/v0/product/' + scanned.text + '.json');
    if (fact && fact.status === 1) {
      Barcodes.update({ _id: scanId }, {$set: { product: fact.product }});
      return true;
    } else {
      return false;
    }
  }
});
