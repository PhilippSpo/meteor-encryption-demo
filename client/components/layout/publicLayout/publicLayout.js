Template.publicLayout.helpers({
  authInProcess: function() {
    return Meteor.loggingIn();
  },
  loggedIn: function() {
    var loggedIn = !!Meteor.user();
    if(loggedIn) {
        // render private layout
        BlazeLayout.render('privateLayout', {
            top: 'homeToolbar',
            main: 'home',
            aside: 'menu'
        });
    }
    return loggedIn;
  }
});
