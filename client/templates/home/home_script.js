Template.home.helpers({
  scans: function () {
    return Scans.find({}, {sort: {createdAt: -1}, limit: 10}).fetch();
  },
  fromNow: function (date) {
    if (date) {
      moment.locale('en');
      return moment(date).fromNow();
    }
  },
  getImg: function (image) {
    if (! image) return '/default-product-img.png';
    return image;
  }
});

Template.home.events({
  'click [data-action=edit]': function (evt) {
    Router.go('/scan/' + this._id);
  },
  'click [data-action=delete]': function (evt) {
    Scans.remove({_id:this._id});
  }
});

Template.home.onRendered(function ( ){
});
