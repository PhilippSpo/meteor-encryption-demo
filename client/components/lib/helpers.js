Template.registerHelper('messageObj', function () {
    var message = Template.instance().message.get();
    if (!message) {
        Template.instance().getMessage(this._id);
    }
    return message;
});

Template.registerHelper('loading', function () {
    console.log(Template.instance().loading.get());
    return Template.instance().loading.get();
});
