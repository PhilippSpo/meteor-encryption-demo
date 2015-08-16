Meteor.publish("activeChats", function () {
    var currentUser = Meteor.users.findOne({
        _id: this.userId
    });
    if (currentUser && currentUser.profile.contacts) {
        return Meteor.users.find({
            _id: {
                $in: currentUser.profile.contacts
            }
        });
    } else {
        this.ready();
    }
});

Meteor.publish("contacts", function () {
    var currentUser = Meteor.users.findOne({
        _id: this.userId
    });
    if (currentUser) {
        var searchIn = [];
        if (currentUser.profile.contacts) {
            searchIn = searchIn.concat(currentUser.profile.contacts);
        }
        if (currentUser.profile.friendRequests) {
            searchIn = searchIn.concat(currentUser.profile.friendRequests);
        }
        return Meteor.users.find({
            _id: {
                $in: searchIn
            }
        });
    } else {
        this.ready();
    }
});

Meteor.methods({
    allUsers: function () {
        return Meteor.users.find({
            _id: {
                $ne: this.userId
            }
        }, {
            fields: {
                emails: 1
            }
        }).fetch();
    },
    /**
     * the user that is calling this function requests freindship with the other user
     * @param otherUserId - id of the user that the current user wants to make freinds with
     */
    requestFriendship: function (otherUserId) {
        if(!otherUserId){
            throw new Meteor.Error('no user given', 'no user to make freinds with is given');
        }
        // add the request to the other user's incoming friend requests
        Meteor.users.update({
            _id: otherUserId
        }, {
            $push: {
                'profile.friendRequests': this.userId
            }
        });
        // add the request to the current user's outgoing freind requests
        Meteor.users.update({
            _id: this.userId
        }, {
            $push: {
                'profile.requestedFriendships': otherUserId
            }
        });
    },
    /**
     * accepts the friendship of the given user
     */
    acceptFriendship: function (otherUserId) {
        if(!otherUserId){
            throw new Meteor.Error('no user given', 'no user to accept freindship with is given');
        }
        // remove the request from the my incoming friend requests
        // add the other user to my contacts and vice verca
        Meteor.users.update({
            _id: this.userId
        }, {
            $pull: {
                'profile.friendRequests': otherUserId
            },
            $push: {
                'profile.contacts': otherUserId
            }
        });
        // remove request from the other user's outgoing freind requests
        // add the current user to the other user's contacts
        Meteor.users.update({
            _id: otherUserId
        }, {
            $pull: {
                'profile.requestedFriendships': this.userId
            },
            $push: {
                'profile.contacts': this.userId
            }
        });
    },
    /**
     * declines the friendship of the given user
     */
    declineFriendship: function (otherUserId) {
        if(!otherUserId){
            throw new Meteor.Error('no user given', 'no user to decline freindship with is given');
        }
        // remove the request from the my incoming friend requests
        Meteor.users.update({
            _id: this.userId
        }, {
            $pull: {
                'profile.friendRequests': otherUserId
            }
        });
        // remove request from the other user's outgoing freind requests
        Meteor.users.update({
            _id: otherUserId
        }, {
            $pull: {
                'profile.requestedFriendships': this.userId
            }
        });
    },
    /**
     * removes the given user from the contacts list of both users
     */
    removeContact: function (otherUserId) {
        if(!otherUserId){
            throw new Meteor.Error('no user given', 'no user to decline freindship with is given');
        }
        // remove the user from the other user's contacts
        Meteor.users.update({
            _id: otherUserId
        }, {
            $pull: {
                'profile.contacts': this.userId
            }
        });
        // remove the user from the current user's contacts
        Meteor.users.update({
            _id: this.userId
        }, {
            $pull: {
                'profile.contacts': otherUserId
            }
        });
    }
});
