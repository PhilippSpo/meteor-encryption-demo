Meteor.publish("principalsForChat", function (chatId) {
    check(chatId, String);
    var chat = Chats.findOne({
        _id: chatId
    });
    check(chat, Object);
    var messages = Messages.find({
        chatId: chatId
    });
    var messageIds = _.map(messages.fetch(), function (message) {
        return message._id;
    });
    // also return the principal of the chat partners in order to perform en-/decryptions
    var principalIds = messageIds.concat(chat.partners);
    // subscribe to all principals that belong to messages of the given chat
    return Principals.find({
        dataId: {
            $in: principalIds
        },
        $or: [{
            ownerId: this.userId
        }, {
            'encryptedPrivateKeys.userId': this.userId
        }]
    });
});
