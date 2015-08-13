Meteor.publish('messages', function (partnerId) {
    if (!partnerId) {
        return;
    }
    return Messages.find({
        chatPartner: {
            $in: [
                partnerId, this.userId
            ]
        },
        author: {
            $in: [
                partnerId, this.userId
            ]
        }
    });
});
