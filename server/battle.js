
Meteor.methods({
    'joinBattle': function(oid) {
        var player = {};
        player["players." + Meteor.user().username] = {
            id: Meteor.userId(),
            name: Meteor.user().username
        };
        Battles.upsert({story: oid}, {$set:player});
    },

    "startMatch": function(battle) {
        var readyPlayers = _.filter(battle.players, function(p){ return p.state == "ready" });

        if(readyPlayers.length >= 2) {
            var p1 = readyPlayers[0];
            var p2 = readyPlayers[1];

            player = {};
            player["players." + p1.name + ".state"] = "playing";
            player["players." + p1.name + ".opponent"] = p2.name;

            Battles.update(battle._id, {$set: player});

            player = {};
            player["players." + p2.name + ".state"] = "playing";
            player["players." + p2.name + ".opponent"] = p1.name;

            Battles.update(battle._id, {$set: player});
        }
    }
});