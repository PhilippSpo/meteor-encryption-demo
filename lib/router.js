// configuration for accounts
SimpleSchema.debug = true;

var tmpPassword;

AccountsTemplates.configure({
	showForgotPasswordLink: true,
	defaultLayout: 'publicLayout',
	overrideLoginErrors: true,
	defaultLayoutRegions: {
		main: ''
	},
	defaultContentRegion: 'main',
	homeRoutePath: '/',
	preSignUpHook: function (password) {
		tmpPassword = password;
	},
	onSubmitHook: function (error, state) {
        if (error) {
            return;
        }
        var password = $('#at-pwd-form :input#at-field-password').val();
        if (state === 'signIn') {
            EncryptionUtils.onSignIn(tmpPassword);
        } else if (state === "signUp") {
            EncryptionUtils.extendProfile(tmpPassword, function () {
                // Users Keypair successfully generated
            });
        }
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
        BlazeLayout.render('publicLayout', {
			main: 'fullPageAtForm'
		});
    }
});
