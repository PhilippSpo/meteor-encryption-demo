Template.fullPageAtFormCustom.replaces("fullPageAtForm");
Template.fullPageAtForm.events({
    'submit': function () {
        Session.setAuth(
            'password',
            $('#at-pwd-form :input#at-field-password').val()
        );
    }
});
