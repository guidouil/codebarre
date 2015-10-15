Template.home.helpers({
  barcodes: function () {
    return Barcodes.find({}, {sort: {createdAt: -1}, limit: 10}).fetch();
  },
  fromNow: function (date) {
    if (date) {
      moment.locale('en');
      return moment(date).fromNow();
    }
  }
});

Template.home.events({
  'click [data-action=delete]': function (evt) {
    Barcodes.remove({_id:this._id});
  }
});

Template.home.onRendered(function ( ){
});
