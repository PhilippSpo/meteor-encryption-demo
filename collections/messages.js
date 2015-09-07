Messages = new Mongo.Collection("messages");

MessagesSchema = new SimpleSchema({
    // user id
    author: {
        type: String,
        label: "Author",
        index: 1
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
    },
    chatId: {
        type: String
    }
});

Messages.before.insert(function (userId, doc) {
    doc.date = new Date();
    doc.author = userId;
});

Messages.attachSchema(MessagesSchema);

if (Meteor.isClient) {
    // define fields to be encrypted
    var fields = ['message'];
    // init encryption on collection Messages
    MessagesEncryption = new CollectionEncryption(Messages, fields, {
        onFinishedDocEncryption: function (doc) {
            var chat = Chats.findOne({
                _id: doc.chatId
            });
            _.each(chat.partners, function (partnerId) {
                if(partnerId !== Meteor.userId()) {
                    Meteor.subscribe('principals', partnerId, function () {
                        MessagesEncryption.shareDocWithUser(doc._id, partnerId);
                    });
                }
            });
        }
    });
}
