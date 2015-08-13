// no updates or removes are possible
Messages.permit(['update', 'remove']).never().apply();
// everybody is allowed to insert as long as he is logged in
Messages.permit(['insert']).ifLoggedIn().apply();
