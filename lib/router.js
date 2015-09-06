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

// This removes the password field but returns it,
// so that you can re-add it later, preserving the
// desired order of the fields
var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.addFields([
  {
      _id: "username",
      type: "text",
      displayName: "username",
      required: true,
      minLength: 5,
  },
  pwd
]);

// setup accounts routes
AccountsTemplates.configureRoute('signIn');

AccountsTemplates.configureRoute('forgotPwd');

AccountsTemplates.configureRoute('signUp');

AccountsTemplates.configureRoute('resetPwd');

// setup main routes
FlowRouter.route('/', {
	name: 'welcome',
	action: function () {
		analytics.page('Welcome');
		BlazeLayout.render('publicLayout', {
			main: 'welcome'
		});
	}
});

FlowRouter.route('/chat/:chatId', {
	name: 'chat',
	action: function () {
		analytics.page('Chat');
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
		analytics.page('Contacts');
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
		analytics.page('Settings');
		BlazeLayout.render('privateLayout', {
			top: 'settingsToolbar',
			main: 'settings',
			aside: 'menu'
		});
	}
});
