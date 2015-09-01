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
        },{
          sort: {
            timestamp: -1
          }
        });
    }
});

Template.chat.events({
    'submit form': function (e) {
        e.preventDefault();
        submitForm();
    },
    'keydown #message': function(e, tmplInst) {
        var message = $(tmplInst.find('#message'));
        var scrollheight = message.outerHeight() + 60;
        if (($('.chat').height() - 100) < scrollheight) {
            // no more line breaks will be accepted
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    },
    'keyup #message': function (e, tmplInst) {
        if (e.which === 13 || e.which === 8) {
            // enter was pressed -> we need to increase the hight
            // backspace was pressed -> we potentially decrease the hight
            var messagesContainer = $(tmplInst.find('.messages'));
            var form = $(tmplInst.find('.chat-form'));
            var message = $(tmplInst.find('#message'));
            var scrollheight = message.outerHeight() + 60;
            if (($('.chat').height() - 100) < scrollheight) {
                // scrollheight = ($('chat').height() - 100);
            }
            form.css('height', scrollheight + 'px');
            messagesContainer.css('bottom', scrollheight + 'px');
        }
    },
    'keypress form': function(e) {
      if (e.which == 13 && !e.ctrlKey) {
        submitForm();
      }
    },
    'keydown form': function(e){
      if(e.ctrlKey && (e.which == 13 || e.keyCode == 13)) {
        $('#message').val(function(i, val) {
            return val + '\n';
        });
      }
    }
});

var submitForm = function() {
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
};
