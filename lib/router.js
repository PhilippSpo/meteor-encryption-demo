// configuration for accounts
SimpleSchema.debug = true;

if (Meteor.isClient) {
	EncryptionUtils.configure({
		enforceEmailVerification: false
	});
}

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
		Session.setAuth(
			'password',
			password
		);
	},
	onSubmitHook: function (error, state) {
		if (error) {
			return;
		}
		var password = Session.get('password');
		if (state === 'signIn' || state === 'signUp') {
			EncryptionUtils.onSignIn(password);
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

FlowRouter.route('/chat/:chatPartnerId', {
	name: 'chat',
	action: function () {
		BlazeLayout.render('privateLayout', {
			top: 'chatToolbar',
			main: 'chat',
			aside: 'menu'
		});
	}
});

FlowRouter.route('/contacts', {
	name: 'contacts',
	action: function () {
		BlazeLayout.render('privateLayout', {
			top: 'contactsToolbar',
			main: 'contacts',
			aside: 'menu'
		});
	}
});

FlowRouter.route('/settings', {
	name: 'settings',
	action: function () {
		BlazeLayout.render('privateLayout', {
			top: 'settingsToolbar',
			main: 'settings',
			aside: 'menu'
		});
	}
});
