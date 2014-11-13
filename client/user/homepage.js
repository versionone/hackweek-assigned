Template.homepage.helpers({
    "inStaging": function() {
        var player = {};
        player["players." + Meteor.user().username] = {$exists: true};
        return Battles.find(player).count() > 0;
    },
    "battle": function() {
        var player = {};
        player["players." + Meteor.user().username] = {$exists: true};
        return Battles.findOne(player);
    }
});