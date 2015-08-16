var ContactsSubs = new SubsManager();
Template.contacts.onCreated(function () {
    var self = this;

    // Subscription
    self.ready = new ReactiveVar();
    self.autorun(function () {
        var handle = ContactsSubs.subscribe(
            'contacts');
        self.ready.set(handle.ready());
    });
    self.autorun(function () {
        // reset the subscription if the profile changed
        Meteor.user();
        // TODO should check here if we need to clear the sub cache
        // only in case of NEW friendRequests and contacts
        ContactsSubs.clear();
    });
});

Template.contacts.helpers({
    ready: function () {
        return Template.instance().ready.get();
    },
    friendRequests: function () {
        // only friend requests
        var friendRequests = Meteor.user().profile.friendRequests;
        if (friendRequests) {
            var users = Meteor.users.find({
                _id: {
                    $in: friendRequests
                }
            });
            return users;
        }
    },
    contacts: function () {
        // only contacts
        var contacts = Meteor.user().profile.contacts;
        if (contacts) {
            var users = Meteor.users.find({
                _id: {
                    $in: contacts
                }
            });
            return users;
        }
    },
});
