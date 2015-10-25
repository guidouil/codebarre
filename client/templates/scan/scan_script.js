Template.scan.helpers({
});

Template.scan.events({
  'submit #scanning': function (evt, tmpl) {
    var scanId = tmpl.data._id;
    var codeScanned = tmpl.data.value;
    var productName = tmpl.find('#productName').value;
    var productBrand = tmpl.find('#productBrand').value;
    var productPrice = Number(tmpl.find('#productPrice').value);
    // console.log(scanId, productName, productBrand, productPrice);
    check(productName, String);
    check(productBrand, String);
    check(productPrice, Number);
    Scans.update({_id: scanId}, {$set:{
      price: productPrice,
      name: productName,
      brand: productBrand
    }});
    Products.update({_id: codeScanned}, {
      $set:
      {
        product_name: productName,
        brands: productBrand
      }
    });
    Router.go('/');
  },
  'click [data-action=cancel]': function () {
    Router.go('/');
  }
});

Template.scan.onRendered(function ( ){
  if (this.data.value) {
    Meteor.subscribe('Products', this.data.value);
    Meteor.subscribe('Images');
  }
  $('#price').focus();
});
