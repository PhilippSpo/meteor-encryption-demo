Template.message.onRendered(function () {
    $('.messages').scrollTop($('.collection').height());
});

Template.message.helpers({
    ifUserIsAuthor: function () {
        return this.author === Meteor.userId();
    },
    email: function () {
        var user = Meteor.users.findOne({
            _id: this.author
        });
        if (!user) {
            return;
        }
        return user.emails[0].address;
    },
    gravatar: function () {
        var user = Meteor.users.findOne({
            _id: this.author
        });
        var options = {
            secure: true
        };
        var md5Hash = Gravatar.hash(user.emails[0].address);
        return Gravatar.imageUrl(md5Hash, options);
    },
    formattedDate: function () {
        if (!moment().startOf('day').isSame(moment(this.date).startOf(
                'day'))) {
            return moment(this.date).format('dd');
        }
        return moment(this.date).format('HH:mm');
    }
});
