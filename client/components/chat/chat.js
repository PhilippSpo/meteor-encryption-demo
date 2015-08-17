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
});

Template.chat.helpers({
    ready: function () {
        return Template.instance().ready.get();
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
        // var messages = Messages.find().fetch();
        // var messagesToRemove = [];
        // // iterate over messages and find consecutive messages that were written within 5 minutes which can be joined
        // _.each(messages, function(message, index) {
        //     // findOne on the message in order to get the decrypted message
        //     message = Messages.findOne({_id: message._id});
        //     // check if previous message happened within 5 minutes
        //     var nextMessage = messages[index+1];
        //     if (nextMessage) {
        //         // create a messages array to which we potentially add consecutive messages
        //         nextMessage.messages = [nextMessage.message];
        //         // check if the consecutive messages have the same author
        //         if (message.author === nextMessage.author && moment(message.date).diff(nextMessage.date, 'minutes') < 5) {
        //             // add current message to next message
        //             nextMessage.messages.push(message.message);
        //             // overwrite the date, so that the message collection shows the oldest date
        //             nextMessage.date = message.date;
        //
        //             messagesToRemove.push(index);
        //         }
        //     }
        // });
        // // remove all the messages
        // _.each(messagesToRemove, function(messageIndex) {
        //     // remove the message
        //     messages.splice(messageIndex, 1);
        // })
        // console.log(messages);
        // return messages;
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
