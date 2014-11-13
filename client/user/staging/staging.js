Template.staging.events({
    'click .leave': function(e) {
        Battles.leave(this);
    },

    'click .ready': function() {
        Battles.ready(this);
    }
});

Template.staging.helpers({
    name: function() {
      return Stories.findOne({oid:this.story}).name;
    },

    username: function() {
        return Meteor.user().username;
    },

    others: function() {
        return _.reject(this.players, function(p, k) {
            return k == Meteor.user().username
        });
    }
});