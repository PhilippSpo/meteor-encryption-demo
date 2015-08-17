var ContactsSubs = new SubsManager();
Template.createChat.onCreated(function () {
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

Template.createChat.helpers({
    ready: function () {
        return Template.instance().ready.get();
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
    }
});

Template.addContactToChatItem.onCreated(function() {
    this.selected = new ReactiveVar(false);
});

Template.addContactToChatItem.helpers({
    email: function () {
        return this.emails[0].address;
    },
    gravatar: function () {
        var options = {
            secure: true
        };
        var md5Hash = Gravatar.hash(this.emails[0].address);
        return Gravatar.imageUrl(md5Hash, options);
    }
});

Template.addContactToChatItem.events({
    'click': function(e, tmpl) {
        GlobalUI.closeDialog();
        FlowRouter.go('/chat/:chatPartnerId', {
            chatPartnerId: this._id
        });
    }
});
