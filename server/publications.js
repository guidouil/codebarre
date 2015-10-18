Meteor.publish('Scans', function () {
  return Scans.find({}, { reactive: true, sort: {createdAt: -1}, limit: 10 });
});
