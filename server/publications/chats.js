Meteor.publish('chats', function (chatId) {
    if (!chatId) {
        return Chats.find();
    }
    return Chats.find({
        _id: chatId
    });
});
