Template.header.helpers({

});

Template.header.events({
  'click [data-action=sidebar]': function () {
    $('.ui.labeled.icon.sidebar').sidebar('toggle');
  },
  'click [data-action=scan]': function () {
    scan();
  }
});

Template.header.onRendered(function ( ) {
});
