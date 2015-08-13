Messages = new Mongo.Collection("messages");

MessagesSchema = new SimpleSchema({
  chatPartner: {
    type: String,
    label: "Chat Partner",
    max: 200
  },
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
  }
});
if (Meteor.isClient) {
    // define fields to be encrypted
    var fields = ['message'];
    console.log("client");
    // init encryption on collection Messages
    DataObjectsEncryption = new CollectionEncryption(Messages, 'message', fields, MessagesSchema, false);
}

Messages.allow({
  insert: function (userId, doc) {
    // the user must be logged in, and the document must be owned by the user
    return true;
  },
  update: function (userId, doc, fields, modifier) {
    // can only change your own documents
    return true;
  },
  remove: function (userId, doc) {
    // can only remove your own documents
    return true;
  }
});
