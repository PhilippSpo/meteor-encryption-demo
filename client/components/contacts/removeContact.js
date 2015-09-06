Template.removeContact.events({
    'click #removeContact': function () {
        Meteor.call('removeContact', this._id, function(error, success){
            if(success){
                Materialize.toast('User was successfully removed from your contacts');
            }
            GlobalUI.closeDialog();
        });
        analytics.track("Remove Contact", {
          eventName: "Remove Contact"
        });
    }
});
