Battles = new Mongo.Collection("battles");

Battles.ready = function(battle) {
    var player = {};
    player["players." + Meteor.user().username +".state"] = "ready";
    Battles.update(battle._id, {$set: player});

    Meteor.call("startMatch", battle, function() {
        
    });
};

Battles.leave = function(battle) {
    var player = {};
    player["players." + Meteor.user().username] = "";

    Battles.update(battle._id, {$unset: player});
};