Meteor.publish('messages', function (chatId) {
    check(chatId, String);
    var chat = Chats.findOne({
        _id: chatId
    });
    // check if the users is member of the chat
    if (!_.contains(chat.partners, this.userId)) {
        return;
    }
    return [
        Messages.find({
            chatId: chatId
        }),
        Meteor.users.find({
            _id: {
                $in: chat.partners
            }
        })
    ];
});
