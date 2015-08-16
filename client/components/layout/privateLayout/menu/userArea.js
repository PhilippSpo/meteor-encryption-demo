Template.userArea.onRendered(function () {
    $('.dropdown-button').dropdown();
});

Template.userArea.onCreated(function() {
    var self = this;
});

Template.userArea.helpers({
    user: function () {
        return Meteor.user();
    },
    userEmail: function () {
        return Meteor.user().emails[0].address;
    },
    gravatar: function () {
        var user = Meteor.user();
        var options = {
            secure: true
        };
        var md5Hash = Gravatar.hash(user.emails[0].address);
        return Gravatar.imageUrl(md5Hash, options);
    }
});

Template.userArea.events({
    'click #logout': function () {
        $('.button-collapse').sideNav('hide');
        AccountsTemplates.logout();
    }
});
