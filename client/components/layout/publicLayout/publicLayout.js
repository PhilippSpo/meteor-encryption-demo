Template.publicLayout.helpers({
  authInProcess: function() {
    return Meteor.loggingIn();
  },
  loggedIn: function() {
    var loggedIn = !!Meteor.user();
    if(loggedIn) {
        Tracker.autorun(function() {
            var privateKey = Session.get('privateKey');
            if(privateKey){
                // render private layout
                BlazeLayout.render('privateLayout', {
                    top: 'homeToolbar',
                    main: 'home',
                    aside: 'menu'
                });
            }
        });
    }
    return loggedIn;
  }
});
