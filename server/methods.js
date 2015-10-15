Meteor.methods({
  searchEan: function (scanned) {
    var fact = HTTP.get('http://world.openfoodfacts.org/api/v0/product/' + scanned.text + '.json');
    if (fact && fact.status === 1) {
      Barcodes.insert({
        value: scanned.text,
        format: scanned.format,
        createdAt: new Date(),
        product: fact.product
      });
      return true;
    } else {
      Barcodes.insert({
        value: scanned.text,
        format: scanned.format,
        createdAt: new Date(),
        product: {name:'not', brands:'found'}
      });
      return false;
    }
  }
});
