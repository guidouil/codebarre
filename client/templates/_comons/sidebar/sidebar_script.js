Template.sidebar.helpers({

});

Template.sidebar.events({
  'click a.item': function () {
    $('.ui.labeled.icon.sidebar').sidebar('toggle');
  },
  'click [data-action=scan]': function () {
    scan();
  },
});

Template.sidebar.onRendered(function ( ){

});
