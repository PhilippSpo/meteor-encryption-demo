Template.chatToolbar.helpers({
    chatPartnerName: function() {
        var partnerId = FlowRouter.getParam('chatPartnerId');
        var chatPartner = Meteor.users.findOne({_id: partnerId});
        if (chatPartner) {
            return chatPartner.username;
        }
        return null;
    }
});

Template.chatToolbar.events({
    'click #back': function() {
        FlowRouter.go('/');
    }
});
