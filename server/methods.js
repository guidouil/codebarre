Meteor.methods({
  searchProductCode: function (codeScanned, codeFormat, scanId) {
    // Search from Products collection
    var product = Products.findOne({_id: codeScanned});
    if (product) {
      return updScanWithProduct(scanId, product);
    } else {
      if (codeFormat.search('EAN') !== -1) {
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
          Products.insert(productNotFound);
          return updScanWithProduct(scanId, productNotFound);
        }
      } else {
        // insert local product
        var productNotEan = {
          _id: codeScanned,
          product_name: codeScanned,
          brands: codeFormat
        };
        Products.insert(productNotEan);
        return updScanWithProduct(scanId, productNotEan);
      }
    }
  },
  uploadCsv: function (csvFile, type) {
    if (type === 'ms') {
      var lineNumber = 0;
      var sdvOrder = 1;
      var sdvs = [];
      var fieldNames = {};
      var document = {};
      var currentPeriod = [];
      var previousPeriod = [];
      var geogkey = '';
      Papa.parse(csvFile, {
        worker: true,
        step: function (results) {
          var row = results.data[0];
          if (lineNumber === 0) {
            fieldNames = row;
          } else {
            if (lineNumber % 3 === 0) {
              document = {
                'geogKey' : geogkey,
                'sdv' : row[1],
                'order' : sdvOrder,
                'currentPeriod': currentPeriod,
                'previousPeriod': previousPeriod
              };
              sdvs.push(document);
              document = {};
              previousPeriod = [];
              currentPeriod = [];
              sdvOrder++;
            } else {
              if (row[4] === 'Periode en cours') {
                geogkey = row[0];
                for (var i = 5; i < 17; i++) {
                  currentPeriod.push(Number(row[i]));
                }
              }
              if (row[4] === 'A-1') {
                for (var i = 5; i < 17; i++) {
                  previousPeriod.push(Number(row[i]));
                }
              }
            }
          }
          lineNumber++;
        }
      });
      if (sdvs && sdvs.length > 0) {
        Sdvs.remove({});
        _.each( sdvs, function (sdv) {
          Sdvs.insert(sdv);
        });
        Periods.remove({});
        var period = [];
        for (var i = 5; i < 17; i++) {
          period.push(fieldNames[i]);
        }
        Periods.insert({'period': period});
      }
    }
    if (type === 'ca') {
      console.log('CA');
      var lineNumber = 0;
      var sdvCas = [];
      var ca = [];
      var conc = [];
      var sdv = '';
      Papa.parse(csvFile, {
        worker: true,
        step: function (results) {
          var row = results.data[0];
          if (lineNumber > 0) {
            if (lineNumber % 2 === 0) {
              for (var i = 4; i < 16; i++) {
                conc.push(Number(row[i]));
              }
              document = {
                'geogKey': row[0],
                'sdv': sdv,
                'ca': ca,
                'conc': conc
              };
              sdvCas.push(document);
              document = [];
              ca = [];
              conc = [];
            } else {
              sdv = row[1];
              for (var i = 4; i < 16; i++) {
                ca.push(Number(row[i]));
              }
            }
          }
          lineNumber++;
        }
      });
      console.log(sdvCas);
      if (sdvCas && sdvCas.length > 0) {
        SdvCas.remove({});
        _.each( sdvCas, function (sdvCa) {
          SdvCas.insert(sdvCa);
        });
      }
    }

  }
});

var updScanWithProduct = function (scanId, product) {
  return Scans.update({ _id: scanId }, {$set: { name: product.product_name, brand: product.brands, image: product.image_small_url }});
};
