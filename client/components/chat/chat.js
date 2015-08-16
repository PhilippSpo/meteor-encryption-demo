var MessagesSubs = new SubsManager();
Template.chat.onCreated(function () {
    var self = this;
    // Subscription
    self.ready = new ReactiveVar();
    var partnerId = FlowRouter.getParam('chatPartnerId');
    self.autorun(function () {
        var handle = MessagesSubs.subscribe(
            'messages', partnerId);
        MessagesSubs.subscribe('principals');
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
    },
    messageObj: function () {
        return Messages.findOne({_id: this._id});
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
    'keyup #message': function(e, tmplInst) {
        if(e.which === 13 || e.which === 8) {
            // enter was pressed -> we need to increase the hight
            // backspace was pressed -> we potentially decrease the hight
            var messagesContainer = $(tmplInst.find('.messages'));
            var form = $(tmplInst.find('.chat-form'));
            var message = $(tmplInst.find('#message'));
            var scrollheight = message.outerHeight()+60;
            form.css('height', scrollheight + 'px');
            messagesContainer.css('bottom', scrollheight + 'px');
        }
    }
});
