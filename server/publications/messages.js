Meteor.publish('messages', function (partnerId) {
    if (!partnerId) {
        return Messages.find({
          query: {
            $or: [{
                author: this.userId
            }, {
                chatPartner: this.userId
            }]
          },
        $orderby: {
          date : 1
        }
      });
    }
    return [
        Messages.find({
          query: {
            chatPartner: {
                $in: [
                    partnerId, this.userId
                ]
            },
            author: {
                $in: [
                    partnerId, this.userId
                ]
            }
          },
          $orderby: {
            date : 1
          }
        }),
        Meteor.users.find({
            _id: {
                $in: [
                    partnerId, this.userId
                ]
            }
        })
    ];
});
