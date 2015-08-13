var UsersSubs = new SubsManager();
Template.userList.onCreated(function () {
    var self = this;

    // Subscription
    self.ready = new ReactiveVar();
    self.autorun(function () {
        var handle = UsersSubs.subscribe(
            'chatPartners');
        self.ready.set(handle.ready());
    });
});

Template.userList.helpers({
    ready: function () {
        return Template.instance().ready.get();
    },
    email: function () {
        return this.emails[0].address;
    },
    users: function () {
        return Meteor.users.find({
            _id: {
                $ne: Meteor.userId()
            }
        });
    },
    gravatar: function () {
        var options = {
            secure: true
        };
        var md5Hash = Gravatar.hash(this.emails[0].address);
        return Gravatar.imageUrl(md5Hash, options);
    }
});

Template.userList.events({
    'click .list-item': function () {
        FlowRouter.go('/chat/:chatPartnerId', {
            chatPartnerId: this._id
        });
    }
});
