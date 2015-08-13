Template.home.helpers({
  email: function(){
    return this.emails[0].address;
  },
  users: function(){
     return Meteor.users.find().fetch();
   }
});
