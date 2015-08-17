Messages = new Mongo.Collection("messages");

MessagesSchema = new SimpleSchema({
    // user id
    chatPartner: {
        type: String,
        label: "Chat Partner",
    },
    // user id
    author: {
        type: String,
        label: "Author"
    },
    date: {
        type: Date,
        label: "Date"
    },
    message: {
        type: String,
        label: "Message",
        max: 1000
    },
    encrypted: {
        type: Boolean,
        defaultValue: false
    }
});

Messages.before.insert(function(userId, doc) {
    doc.date = new Date();
    doc.author = userId;
});

Messages.attachSchema(MessagesSchema);

if (Meteor.isClient) {
    // define fields to be encrypted
    var fields = ['message'];
    // init encryption on collection Messages
    MessagesEncryption = new CollectionEncryption(Messages, 'message',
        fields, MessagesSchema, false);

    MessagesEncryption.getMessage = function(id) {
        var self = this;
        self.loading = new ReactiveVar(true);
        self.message = new ReactiveVar();

        self.getMessage = function(id) {
          Meteor.defer(function() {
            Tracker.autorun(function() {
              self.loading.set(true);
              var message = Messages.findOne({
                _id: id
              });
              if (message) {
                self.message.set(message);
              }
              self.loading.set(false);
            });
          });
        };
    };
}
