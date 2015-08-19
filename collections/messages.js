Messages = new Mongo.Collection("messages");

MessagesSchema = new SimpleSchema({
    // user id
    chatPartner: {
        type: String,
        label: "Chat Partner",
        index: 1
    },
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
            MessagesEncryption.shareDocWithUser(doc._id, doc.chatPartner);
        }
    });
}
