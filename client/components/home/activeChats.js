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
            $or: [{
                author: Meteor.userId()
            }, {
                chatPartner: Meteor.userId()
            }]
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

Template.activeChatsListItem.helpers({
    messageObj: function () {
        return Messages.findOne({_id: this._id});
    },
    user: function () {
        var userId = this.chatPartner;
        // check if the chat partner is the own user
        if (userId === Meteor.userId()) {
            // if so use the author as the email that user that is displayed
            userId = this.author;
        }
        return Meteor.users.findOne({
            _id: userId
        });
    },
    gravatar: function () {
        var options = {
            secure: true
        };
        var md5Hash = Gravatar.hash(this.emails[0].address);
        return Gravatar.imageUrl(md5Hash, options);
    },
    formattedDate: function () {
        if (!moment().startOf('day').isSame(moment(this.date).startOf(
                'day'))) {
            return moment(this.date).format('dd');
        }
        return moment(this.date).format('HH:mm');
    }
});

Template.activeChatsListItem.events({
    'click': function () {
        var userId = this.chatPartner;
        // check if the chat partner is the own user
        if (userId === Meteor.userId()) {
            // if so use the author as the email that user that is displayed
            userId = this.author;
        }
        FlowRouter.go('/chat/:chatPartnerId', {
            chatPartnerId: userId
        });
    }
});
