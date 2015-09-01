var ChatsSubs = new SubsManager();
Template.chatToolbar.onCreated(function () {
    var self = this;
    // Subscription
    self.ready = new ReactiveVar();
    var chatId = FlowRouter.getParam('chatId');
    self.autorun(function () {
        var handle = ChatsSubs.subscribe(
            'chats', chatId);
        self.ready.set(handle.ready());
    });
});

Template.chatToolbar.helpers({
    chatPartners: function() {
        var chat = Chats.findOne({
            _id: FlowRouter.getParam('chatId')
        });
        if(!chat){
            return;
        }
        var partners = _.filter(chat.partners, function(partner) {
            return partner !== Meteor.userId();
        });
        partners = _.map(partners, function (partnerId) {
            var user = Meteor.users.findOne({_id: partnerId});
            if (user) {
                return user.username;
            }
        });
        return partners.join(', ');
    },
    ready: function () {
        return Template.instance().ready.get();
    }
});

Template.chatToolbar.events({
    'click #back': function() {
        FlowRouter.go('/');
    }
});
