Template.addContactItem.onCreated(function () {
    var self = this;
    self.requested = new ReactiveVar(false);
});

Template.addContactItem.helpers({
    email: function () {
        return this.emails[0].address;
    },
    gravatar: function () {
        var options = {
            secure: true
        };
        var md5Hash = Gravatar.hash(this.emails[0].address);
        return Gravatar.imageUrl(md5Hash, options);
    },
    requested: function () {
        return Template.instance().requested.get();
    }
});

Template.addContactItem.events({
    'click #addContact': function (evt, tmpl) {
        Meteor.call('requestFriendship', this._id, function(error, result){
            if(error) {
                Materialize.toast(error.message, 4000);
            } else {
                tmpl.requested.set(true);
                Materialize.toast('Friend request was sent!', 4000);
            }
        });
    }
});
