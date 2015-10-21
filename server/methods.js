Meteor.methods({
  searchEan: function (codeEan, scanId) {
    // Search from Products collection
    var product = Products.findOne({_id: codeEan});
    if (product) {
      return updScanWithProduct(scanId, product);
    } else {
      // Search from openfoodfacts.org
      var response = HTTP.get('http://world.openfoodfacts.org/api/v0/product/' + codeEan + '.json');
      if (response && response.statusCode === 200 && response.data && response.data.status === 1) {
        Products.insert(response.data.product);
        return updScanWithProduct(scanId, response.data.product);
      } else {
        var productNotFound = {
          _id: codeEan,
          product_name: 'notFound',
          brands: '404',
          image_small_url: false
        };
        return updScanWithProduct(scanId, productNotFound);
      }
    }
  }
});

var updScanWithProduct = function (scanId, product) {
  return Scans.update({ _id: scanId }, {$set: { name: product.product_name, brand: product.brands, image: product.image_small_url }});
};
