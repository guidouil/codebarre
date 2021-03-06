Template.header.helpers({

});

Template.header.events({
  'click [data-action=sidebar]': function () {
    if (! $('.pusher').hasClass('dimmed')) {
      $('.ui.labeled.icon.sidebar').sidebar('toggle');
    }
  },
  'click [data-action=goHome]': function () {
    Router.go('home');
    $('.scans-list').animate({ scrollTop: 0 }, 'slow');
  },
  'click [data-action=signIn]': function () {
    Router.go('/sign-in');
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
    Meteor.call('searchProductCode', '3336971010012', 'EAN_13', scanId, function (error, result) {
      // console.log(error, result);
    });
    Router.go('/scan/' + scanId);
  }
});

Template.header.onRendered(function ( ) {
});
