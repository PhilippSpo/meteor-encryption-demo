Template.friendRequestItem.helpers({
    gravatar: function () {
        var options = {
            secure: true
        };
        var md5Hash = Gravatar.hash(this.emails[0].address);
        return Gravatar.imageUrl(md5Hash, options);
    }
});

Template.friendRequestItem.events({
    'click #accept': function() {
        Meteor.call('acceptFriendship', this._id, function(error, result){
            if(result) {
                Materialize.toast('Friendship accepted!');
            }
        });
    },
    'click #decline': function() {
        Meteor.call('declineFriendship', this._id, function(error, result){
            if(result) {
                Materialize.toast('Friendship declined!');
            }
        });
    }
});
