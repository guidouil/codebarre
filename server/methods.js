Meteor.methods({
  searchProductCode: function (codeScanned, codeFormat, scanId) {
    // Search from Products collection
    var product = Products.findOne({_id: codeScanned});
    if (product) {
      return updScanWithProduct(scanId, product);
    } else if (codeFormat.search('EAN') !== -1) {
      // Search from openfoodfacts.org
      var response = HTTP.get('http://world.openfoodfacts.org/api/v0/product/' + codeScanned + '.json');
      if (response && response.statusCode === 200 && response.data && response.data.status === 1) {
        Products.insert(response.data.product);
        return updScanWithProduct(scanId, response.data.product);
      } else {
        var productNotFound = {
          _id: codeScanned,
          product_name: 'notFound',
          brands: '404'
        };
        return updScanWithProduct(scanId, productNotFound);
      }
    } else {
      // insert local product
      Products.insert({
        _id: codeScanned,
        product_name: codeScanned,
        brands: codeFormat
      });
    }
  }
});

var updScanWithProduct = function (scanId, product) {
  return Scans.update({ _id: scanId }, {$set: { name: product.product_name, brand: product.brands, image: product.image_small_url }});
};
