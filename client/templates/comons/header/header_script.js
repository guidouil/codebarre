Template.header.helpers({

});

Template.header.events({
  'click [data-action=sidebar]': function () {
    $('.ui.labeled.icon.sidebar').sidebar('toggle');
  },
  'click [data-action=goHome]': function () {
    Router.go('home');
  },
  'click [data-action=scan]': function () {
    scan();
  },
  'click [data-action=fakeScan]': function () {
    var scanId = Scans.insert({
      value: '3336971010012',
      format: 'EAN_13',
      product: {name:'', brands:''}
    });
    Meteor.call('searchEan', '3336971010012', scanId, function (error, result) {
      console.log(error, result);
    });
    Router.go('/scan/' + scanId);
  }
});

Template.header.onRendered(function ( ) {
});
