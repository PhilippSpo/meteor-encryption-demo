var ActiveChatsMessagesSubs = new SubsManager();
var ActiveChatsSubs = new SubsManager();
Template.activeChats.onCreated(function () {
    var self = this;

    // Subscription
    self.ready = new ReactiveVar();
    self.autorun(function () {
        var handle = ActiveChatsMessagesSubs.subscribe(
            'messages');
        ActiveChatsSubs.subscribe('activeChats');
        self.subscribe('principals');
        self.ready.set(handle.ready());
    });
});

Template.activeChats.helpers({
    ready: function () {
        return Template.instance().ready.get();
    },
    activeChats: function () {
        // check the recent messages of the user
        var messages = Messages.find({
            author: Meteor.userId()
        }).fetch();
        groupedMessages = _.groupBy(messages, 'chatPartner');
        var resultMessages = [];
        _.each(groupedMessages, function (messages) {
            resultMessages.push(messages[messages.length -
                1]);
        });
        return resultMessages;
    }
});

Template.activeChatsListItem.onCreated(function() {
    MessagesEncryption.getMessage.call(this);
});

Template.activeChatsListItem.helpers({
    user: function () {
        return Meteor.users.findOne({
            _id: this.chatPartner
        });
    },
    email: function () {
        return this.emails[0].address;
    },
    gravatar: function () {
        var options = {
            secure: true
        };
        var md5Hash = Gravatar.hash(this.emails[0].address);
        return Gravatar.imageUrl(md5Hash, options);
    },
    formattedDate: function () {
        if(!moment().startOf('day').isSame(moment(this.date).startOf('day'))) {
            return moment(this.date).format('dd');
        }
        return moment(this.date).format('HH:mm');
    }
});

Template.activeChatsListItem.events({
    'click': function() {
        FlowRouter.go('/chat/:chatPartnerId', {
            chatPartnerId: this.chatPartner
        });
    }
});
