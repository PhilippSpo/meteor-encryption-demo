// no updates or removes are possible
Messages.permit(['update', 'remove']).never().apply();
// everybody is allowed to insert as long as he is logged in
Messages.permit(['insert']).ifLoggedIn().ifUserIsAuthor().apply();
// messages need to be updated by the encryption package
Messages.permit(['update']).ifLoggedIn().ifUserIsAuthor().apply();

// no updates or removes are possible
Chats.permit(['remove']).never().apply();
// everybody is allowed to insert as long as he is logged in
Chats.permit(['insert']).ifLoggedIn().ifUserIsPartner().apply();
