Meteor.publish('Scans', function (limit) {
  return Scans.find({}, { reactive: true, sort: {createdAt: -1}, limit: limit });
});

Meteor.publish('Products', function (productId) {
  return Products.find({_id: productId});
});

Meteor.publish('Images', function () {
  return Images.find({});
});

Meteor.publish('Sdvs', function () {
  return Sdvs.find({});
});

Meteor.publish('Periods', function () {
  return Periods.find({});
});
