Meteor.publish('chats', function (chatId) {
    if (!chatId) {
        return Chats.find({
            partners: this.userId
        });
    }
    return Chats.find({
        _id: chatId,
        partners: this.userId
    });
});
