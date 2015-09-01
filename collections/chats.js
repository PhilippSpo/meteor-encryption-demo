Chats = new Mongo.Collection("chats");

ChatsSchema = new SimpleSchema({
    // user ids
    partners: {
        type: [String],
        label: "Chat Partners",
        min: 2,
        index: 1
    }
});

Chats.before.insert(function (userId, doc) {
    if(!_.contains(doc.partners, userId)){
        doc.partners.push(userId);
    }
});

Chats.attachSchema(ChatsSchema);
