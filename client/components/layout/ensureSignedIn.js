Template.privateMode.helpers({
  authInProcess: function() {
    return Meteor.loggingIn();
  },
  canShow: function() {
    var canShow = !!Meteor.user();
    return canShow;
  }
});
