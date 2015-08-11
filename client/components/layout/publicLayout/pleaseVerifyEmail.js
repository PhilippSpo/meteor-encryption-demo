Template.pleaseVerifyEmail.events({
    'click #signOut': function () {
        AccountsTemplates.logout();
    },
    'click #sendAgain': function () {
        Meteor.logout(function() {
            FlowRouter.go('/send-again');
        });
    }
});
