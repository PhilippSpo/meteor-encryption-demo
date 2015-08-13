Meteor.publish("chatPartners", function () {
    return Meteor.users.find({
        _id: {
            $ne: this.userId
        }
    });
});
