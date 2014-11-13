Template.stories.helpers({
    stories: function() {
        return Stories.find();
    }
});

Template.stories.events({
    'click .battle': function(e) {
        Meteor.call("joinBattle", this.oid);
    }
});