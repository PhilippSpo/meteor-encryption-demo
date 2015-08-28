Template.message.onRendered(function () {
    $('.messages').scrollTop($('.collection').height());
});

Template.message.helpers({
    messageObj: function () {
        return Messages.findOne({_id: this._id});
    },
    ifUserIsAuthor: function () {
        return this.author === Meteor.userId();
    },
    username: function () {
        var user = Meteor.users.findOne({
            _id: this.author
        });
        if (!user) {
            return;
        }
        return user.username;
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
