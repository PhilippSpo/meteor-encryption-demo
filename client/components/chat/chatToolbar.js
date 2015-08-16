Template.chatToolbar.helpers({
    chatPartnerMail: function() {
        var partnerId = FlowRouter.getParam('chatPartnerId');
        var chatPartner = Meteor.users.findOne({_id: partnerId});
        if (chatPartner) {
            return chatPartner.emails[0].address;
        }
        return null;
    }
});

Template.chatToolbar.events({
    'click #back': function() {
        FlowRouter.go('/');
    }
});
