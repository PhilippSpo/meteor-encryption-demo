Template.menuItem.events({
	'click .list-item': function() {
		FlowRouter.go(this.path, this.params);
	}
});
