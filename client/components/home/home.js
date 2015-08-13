Template.home.helpers({
    email: function () {
        return this.emails[0].address;
    },
    users: function () {
        return Meteor.users.find().fetch();
    },
    gravatar: function () {
        var options = {
            secure: true
        };
        var md5Hash = Gravatar.hash(this.emails[0].address);
        return Gravatar.imageUrl(md5Hash, options);
    }
});
