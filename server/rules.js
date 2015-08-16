Security.defineMethod('ifUserIsAuthor', {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId, doc) {
        return doc.author !== userId;
    }
});
