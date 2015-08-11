Template.privateLayout.helpers({
    bigPreview: function() {
        return BigPreview.active.get();
    },
    authInProcess: function() {
        return Meteor.loggingIn();
    },
    loggedIn: function() {
        var loggedIn = !!Meteor.user();
        if(!loggedIn) {
            BlazeLayout.render('publicLayout');
        }
        return loggedIn;
    }
});
