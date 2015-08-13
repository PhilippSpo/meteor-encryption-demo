Meteor.publish("users", function () {
  console.log(Meteor.users.find().fetch());
  return Meteor.users.find();
});
