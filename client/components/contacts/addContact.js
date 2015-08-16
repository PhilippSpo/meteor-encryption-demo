Template.addContact.onCreated(function () {
    var self = this;

    // Subscription
    self.ready = new ReactiveVar();
    self.users = new ReactiveVar();
    Meteor.call('allUsers', function(error, result) {
        self.users.set(result);
        self.ready.set(true);
    });
});

Template.addContact.helpers({
    ready: function () {
        return Template.instance().ready.get();
    },
    users: function() {
        return Template.instance().users.get();
    }
});
