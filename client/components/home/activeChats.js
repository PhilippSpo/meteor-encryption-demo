var ActiveChatsSubs = new SubsManager();
var ActiveChatUsersSubs = new SubsManager();
var ActiveChatMessagesSubs = new SubsManager();

Template.activeChats.onCreated(function () {
    var self = this;

    // Subscription
    self.ready = new ReactiveVar();
    self.autorun(function () {
        var chatHandle = ActiveChatsSubs.subscribe('chats');
        var usersHandle = ActiveChatUsersSubs.subscribe('activeChatUsers');
        var principalsHandle = self.subscribe('principals');
        self.ready.set(chatHandle.ready() && usersHandle.ready() && principalsHandle.ready());
    });
});

Template.activeChats.helpers({
    ready: function () {
        return Template.instance().ready.get();
    },
    activeChats: function () {
        var chats = Chats.find().fetch();
        return chats;
    }
});

var ActiveChatMessageSubs = new SubsManager();
Template.activeChatsListItem.onCreated(function () {
    var self = this;
    // Subscription
    self.ready = new ReactiveVar();
    self.autorun(function () {
        var handle = ActiveChatMessageSubs.subscribe('messages',
            self.data._id);
        self.ready.set(handle.ready());
    });
});

Template.activeChatsListItem.helpers({
    ready: function () {
        return Template.instance().ready.get();
    },
    messageObj: function () {
        return Messages.findOne({
            chatId: this._id
        }, {
            sort: {
                date: -1
            }
        });
    },
    chatPartners: function () {
        var chat = Chats.findOne({
            _id: Template.instance().data._id
        });
        var partners = _.filter(chat.partners, function (partner) {
            return partner !== Meteor.userId();
        });
        partners = _.map(partners, function (partnerId) {
            var user = Meteor.users.findOne({
                _id: partnerId
            });
            if (user) {
                return user.username;
            }
        });
        return partners.join(', ');
    },
    user: function () {
        var userId = this.author || this.partners[0];
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
    'click': function (e, tmpl) {
        FlowRouter.go('/chat/:chatId', {
            chatId: tmpl.data._id
        });
    }
});
