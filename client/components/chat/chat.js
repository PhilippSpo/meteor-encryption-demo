var MessagesSubs = new SubsManager();
Template.chat.onCreated(function () {
    var self = this;

    // Subscription
    self.ready = new ReactiveVar();
    var partnerId = FlowRouter.getParam('chatPartnerId');
    self.autorun(function () {
        var handle = MessagesSubs.subscribe(
            'messages', partnerId);
        self.ready.set(handle.ready());
    });
});

Template.chat.helpers({
    ready: function () {
        return Template.instance().ready.get();
    },
    email: function () {
        var user = Meteor.users.findOne({
            _id: this.author
        });
        if(!user) {
            return;
        }
        return user.emails[0].address;
    },
    gravatar: function () {
        var user = Meteor.users.findOne({
            _id: this.author
        });
        var options = {
            secure: true
        };
        var md5Hash = Gravatar.hash(user.emails[0].address);
        return Gravatar.imageUrl(md5Hash, options);
    },
    messages: function () {
        return Messages.find();
    }
});

Template.chat.events({
    'click .btn-floating': function () {
        var message = $('#message').val();
        if (!message) {
            console.warn('no message given');
        }
        var partnerId = FlowRouter.getParam('chatPartnerId');
        Messages.insert({
            chatPartner: partnerId,
            // this will be validated by the server
            author: Meteor.userId(),
            // this also should be validated by the server
            date: new Date(),
            message: message
        });
    }
});
