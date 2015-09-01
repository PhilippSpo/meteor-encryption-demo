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
        var partners = _.map(chat.partners, function (partnerId) {
            if(partnerId !== Meteor.userId()){
                return Meteor.users.findOne({_id: partnerId});
            }
        });
        return partners;
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
