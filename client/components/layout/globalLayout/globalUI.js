this.GlobalUI = (function () {
	function GlobalUI() {}

	GlobalUI.dialog = {};

	GlobalUI.showDialog = function (opts) {
		this.dialog = $("[global-dialog]");
		this.dialog.heading = opts.heading;
		Session.set("global.ui.dialogData", opts.data());
		Session.set("global.ui.dialogTemplate", opts.template);
		if(opts.fixedFooter === true){
			Session.set("global.ui.fixedFooter", 'modal-fixed-footer');
		}else {
			Session.set("global.ui.fixedFooter", null);
		}
		if(opts.big === true){
			Session.set("global.ui.big", 'big');
		}else {
			Session.set("global.ui.big", null);
		}
		return Tracker.afterFlush((function (_this) {
			return function () {
				return _this.dialog.openModal({
					dismissible: true,
					in_duration: 300,
					out_duration: 200,
					complete: function() {
						Session.set("global.ui.dialogData", null);
						Session.set("global.ui.dialogTemplate", null);
					}
				});
			};
		})(this));
	};


	GlobalUI.closeDialog = function () {
		// set timeout so the animation does not collapse
		setTimeout(function(){
			Session.set("global.ui.dialogData", null);
			Session.set("global.ui.dialogTemplate", null);
		}, 200);
		return this.dialog.closeModal();
	};

	return GlobalUI;

})();
