// configuration for accounts
AccountsTemplates.configure({
	showForgotPasswordLink: true,
	defaultLayout: 'publicLayout',
	overrideLoginErrors: true,
	defaultLayoutRegions: {
		top: '',
		aside: '',
		main: ''
	},
	defaultContentRegion: 'main',
	homeRoutePath: '/',
	onSubmitHook: function (error, state) {
        // if (error) {
        //     return;
        // }
        // var password = $('#at-pwd-form :input#at-field-password').val();
        // if (state === 'signIn') {
        //     EncryptionUtils.onSignIn(password);
        // } else if (state === "signUp") {
        //     EncryptionUtils.extendProfile(password, function () {
        //         // Users Keypair successfully generated
        //     });
        // }
    },

	negativeValidation: true,
	positiveValidation: true,
	negativeFeedback: false,
	positiveFeedback: false
});

// setup accounts routes
AccountsTemplates.configureRoute('signIn');

AccountsTemplates.configureRoute('forgotPwd');

AccountsTemplates.configureRoute('signUp');

AccountsTemplates.configureRoute('resetPwd');

// setup main routes
FlowRouter.route('/', {
    name: 'welcome',
    action: function () {
        BlazeLayout.render('publicLayout');
    }
});
