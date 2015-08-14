// no updates or removes are possible
Messages.permit(['update', 'remove']).never().apply();
// everybody is allowed to insert as long as he is logged in
Messages.permit(['insert']).ifLoggedIn().apply();
// messages need to be updated by the encryption package
Messages.permit(['update']).ifLoggedIn().apply();
