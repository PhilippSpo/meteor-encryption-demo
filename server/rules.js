Security.defineMethod('ifUserIsAuthor', {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId, doc) {
        return doc.author !== userId;
    }
});

Security.defineMethod('ifUserIsPartner', {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId, doc) {
        console.log(doc);
        return _.contains(doc.partners, userId) === false;
    }
});
