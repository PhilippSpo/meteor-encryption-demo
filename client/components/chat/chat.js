var MessagesSubs = new SubsManager();
Template.chat.onCreated(function () {
    var self = this;

    // Subscription
    self.ready = new ReactiveVar();
    var partnerId = FlowRouter.getParam('chatPartnerId');
    self.autorun(function () {
        var handle = MessagesSubs.subscribe(
            'messages', partnerId);
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
            // this also should be validated by the server
            date: new Date(),
            message: message
        });
        // clear message
        $('#message').val('');
    },
    'keyup #message': function(e, tmplInst) {
        console.log(e.which)
        if(e.which === 13 || e.which === 8) {
            // enter was pressed -> we need to increase the hight
            var messagesContainer = $(tmplInst.find('.messages'));
            var form = $(tmplInst.find('.chat-form'));
            var message = $(tmplInst.find('#message'));
            var scrollheight = message.outerHeight()+60;
            console.log(scrollheight);
            form.css('height', scrollheight + 'px');
            messagesContainer.css('bottom', scrollheight + 'px');
        }
    }
});
