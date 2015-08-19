Template.registerHelper('messageObj', function () {
    // if the doc is already decrypted just return it
    if(!this.encrypted){
        return this;
    }
    return Messages.findOne({_id: this._id});
});

Template.registerHelper('loading', function () {
    return Template.instance().loading.get();
});
