Router.configure({
  layoutTemplate: 'main',
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading',
  templateNameConverter: 'camelCase',
  routeControllerNameConverter: 'camelCase'
});

Router.route('/', {
  name: 'home',
  title: 'Home',
  waitOn: function () {
    handle = Meteor.subscribeWithPagination('Scans', 20);
  }
});

Router.route('/scan/:scanId', {
  name: 'scan',
  title: 'Scan',
  waitOn: function () {
    return Meteor.subscribe('Scans');
  },
  data: function () {
    return Scans.findOne({_id: this.params.scanId});
  }
});

Router.route('/list', {
  name: 'list',
  title: 'List'
});

Router.plugin('ensureSignedIn', {
  only: ['private']
});

//Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');
