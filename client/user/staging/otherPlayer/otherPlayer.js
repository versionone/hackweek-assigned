Template.otherPlayer.helpers({
    name: function() {
        return Meteor.users.findOne(this.id).username;
    }
});