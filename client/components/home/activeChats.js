var ActiveChatsSubs = new SubsManager();
Template.activeChats.onCreated(function () {
    var self = this;

    // Subscription
    self.ready = new ReactiveVar();
    self.autorun(function () {
        var handle = ActiveChatsSubs.subscribe(
            'activeChats');
        self.ready.set(handle.ready());
    });
});

Template.activeChats.helpers({
    ready: function () {
        return Template.instance().ready.get();
    }
});
