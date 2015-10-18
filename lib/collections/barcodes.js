Scans = new Mongo.Collection('scans');
Scans.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  remove: function () {
    // return userId && doc.owner === userId;
    return true;
  }
});

var Schemas = {};
Schemas.Scans = new SimpleSchema({
  value: {
    type: String,
    label: 'Value',
    max: 250
  },
  format: {
    type: String,
    label: 'Format',
    max: 250
  },
  price: {
    type: Number,
    decimal: true,
    label: 'Price',
    optional: true
  },
  scanner: {
    type: String,
    label: 'Scanner',
    optional: true
  },
  product: {
    type: Object,
    label: 'Product',
    optional: true,
    blackbox: true
  },
});
Scans.attachSchema(Schemas.Scans);
