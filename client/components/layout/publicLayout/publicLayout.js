Template.publicLayout.helpers({
  authInProcess: function() {
    return Meteor.loggingIn();
  },
  loggedIn: function() {
    var loggedIn = !!Meteor.user();
    if(loggedIn) {
        // check if the private key has already been decrypted
        if(EncryptionUtils.hasPrivateKey() === false){
            // if not -> wait until it is and then render private
            EncryptionUtils.waitForPrivateKey(function () {
                // render private layout
                BlazeLayout.render('privateLayout', {
                    top: 'homeToolbar',
                    main: 'home',
                    aside: 'menu'
                });
            });
        } else {
            // render private layout right away since
            // the private key is already decrypted
            BlazeLayout.render('privateLayout', {
                top: 'homeToolbar',
                main: 'home',
                aside: 'menu'
            });
        }
    }
    return loggedIn;
  }
});
