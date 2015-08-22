var MessagesSubs = new SubsManager();
Template.chat.onCreated(function () {
    var self = this;
    // Subscription
    self.ready = new ReactiveVar();
    var partnerId = FlowRouter.getParam('chatPartnerId');
    self.autorun(function () {
        var handle = MessagesSubs.subscribe(
            'messages', partnerId);
        self.subscribe('principals', partnerId);
        self.ready.set(handle.ready());
    });
    // self.autorun(function() {
    //     var messages = Messages.find({
    //         chatPartner: {
    //             $in: [
    //                 partnerId, Meteor.userId()
    //             ]
    //         },
    //         author: {
    //             $in: [
    //                 partnerId, Meteor.userId()
    //             ]
    //         }
    //     });
    //     console.log(messages.fetch());
    // });
});

Template.chat.helpers({
    ready: function () {
        var ready = Template.instance().ready.get();
        return ready;
    },
    messages: function () {
        var partnerId = FlowRouter.getParam('chatPartnerId');
        return Messages.find({
            chatPartner: {
                $in: [
                    partnerId, Meteor.userId()
                ]
            },
            author: {
                $in: [
                    partnerId, Meteor.userId()
                ]
            }
        });
    }
});

Template.chat.events({
    'submit form': function (e) {
        e.preventDefault();
        var message = $('#message').val();
        // check if there is a message
        if (!message) {
            Materialize.toast('Please provide a message', 2000);
            return;
        }
        // get the partner
        var partnerId = FlowRouter.getParam('chatPartnerId');
        // send the message
        Messages.insert({
            chatPartner: partnerId,
            // this will be validated by the server
            author: Meteor.userId(),
            // this is should validated by the server
            date: new Date(),
            message: message
        });
        // clear message
        $('#message').val('');
    },
    'keyup #message': function (e, tmplInst) {
        if (e.which === 13 || e.which === 8) {
            // enter was pressed -> we need to increase the hight
            // backspace was pressed -> we potentially decrease the hight
            var messagesContainer = $(tmplInst.find('.messages'));
            var form = $(tmplInst.find('.chat-form'));
            var message = $(tmplInst.find('#message'));
            var scrollheight = message.outerHeight() + 60;
            form.css('height', scrollheight + 'px');
            messagesContainer.css('bottom', scrollheight + 'px');
        }
    }
});
