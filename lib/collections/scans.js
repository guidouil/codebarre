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
  name: {
    type: String,
    label: 'Name',
    max: 250,
    optional: true
  },
  brand: {
    type: String,
    label: 'Brand',
    max: 250,
    optional: true
  },
  image: {
    type: String,
    label: 'Image',
    max: 250,
    optional: true
  },
  product: {
    type: Object,
    label: 'Product',
    optional: true,
    blackbox: true
  },
  picture: {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Images',
        label: 'Choose file'
      }
    },
    optional: true
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();
      }
    },
    autoform :
    {
      omit: true
    }
  },
  updatedAt: {
    type: Date,
    autoValue: function () {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true,
    autoform :
    {
      omit: true
    }
  }
});
Scans.attachSchema(Schemas.Scans);

Ground.Collection(Scans);
