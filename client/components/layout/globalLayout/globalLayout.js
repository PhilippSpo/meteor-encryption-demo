Template.globalLayout.helpers({
    globalDialogTemplate: function() {
        return Session.get("global.ui.dialogTemplate");
    },
    globalDialogData: function() {
        return Session.get("global.ui.dialogData");
    },
    globalDialogFixedFooter: function() {
        return Session.get('global.ui.fixedFooter');
    },
    globalDialogBig: function() {
        return Session.get('global.ui.big');
    }
});

Template.globalLayout.events({
    "click [data-open-dialog]": function(e) {
        var node = $(e.currentTarget);
        showDialogForNode(node, this);
    },
    "click #abortDialog": function(e) {
        e.preventDefault();
        GlobalUI.closeDialog();
    },
    "click .submit-button": function(e) {
        var btn = $(e.target);
        var form = $(btn.data('form'));
        if (form) {
            form.submit();
        }
    }
});

this.showDialogForNode = function(node, context) {
    return GlobalUI.showDialog({
        heading: node.data("heading"),
        template: node.data("template"),
        fixedFooter: node.data("fixedfooter"),
        big: node.data("big"),
        data: function() {
            if (node.data("context") !== null) {
                return context;
            }
            return void 0;
        }
    });
};
