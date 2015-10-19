Meteor.publish('Scans', function (limit) {
  return Scans.find({}, { reactive: true, sort: {createdAt: -1}, limit: limit });
});
