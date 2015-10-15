Meteor.publish('Barcodes', function () {
  return Barcodes.find({}, { reactive: true, sort: {createdAt: -1}, limit: 10 });
});
