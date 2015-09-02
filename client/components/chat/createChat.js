var ContactsSubs = new SubsManager();
Template.createChat.onCreated(function () {
    var self = this;

    // Subscription
    self.ready = new ReactiveVar();
    self.partners = new ReactiveArray();
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

Template.createChat.events({
    'click #createChat': function(e, tmpl) {
        GlobalUI.closeDialog();
        chatId = Chats.insert({
            partners: tmpl.partners.array()
        });
        FlowRouter.go('/chat/:chatId', {
            chatId: chatId
        });
    },
    'click [data-action=addContacts]': function () {
        Session.set("global.ui.dialogTemplate", "addContact");
    }
});

Template.addContactToChatItem.onCreated(function() {
    this.selected = new ReactiveVar(false);
});

Template.addContactToChatItem.helpers({
    gravatar: function () {
        var options = {
            secure: true
        };
        var md5Hash = Gravatar.hash(this.emails[0].address);
        return Gravatar.imageUrl(md5Hash, options);
    },
    selected: function () {
        return Template.instance().selected.get();
    }
});

Template.addContactToChatItem.events({
    'click': function(e, tmpl) {
        var selected = tmpl.selected.get();
        if(selected){
            tmpl.selected.set(false);
            tmpl.parentTemplate().partners.remove(this._id);
        } else {
            tmpl.selected.set(true);
            tmpl.parentTemplate().partners.push(this._id);
        }
    }
});
