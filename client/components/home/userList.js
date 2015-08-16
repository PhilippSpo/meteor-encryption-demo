Template.userList.helpers({
    email: function () {
        return this.emails[0].address;
    },
    gravatar: function () {
        var options = {
            secure: true
        };
        var md5Hash = Gravatar.hash(this.emails[0].address);
        return Gravatar.imageUrl(md5Hash, options);
    }
});

Template.userList.events({
    'click .list-item': function () {
        FlowRouter.go('/chat/:chatPartnerId', {
            chatPartnerId: this._id
        });
    }
});
